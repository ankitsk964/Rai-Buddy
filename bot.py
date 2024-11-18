from flask import Flask, request, abort, jsonify
import os

from linebot.v3 import (
    WebhookHandler
)

from linebot.v3.exceptions import (
    InvalidSignatureError
)

from linebot.v3.messaging import (
    Configuration,
    ApiClient,
    MessagingApi,
    ReplyMessageRequest,
    TextMessage,
)

from linebot.v3.webhooks import (
    MessageEvent,
    TextMessageContent
)

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.llms import Ollama
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)


# Load channel access token and secret from environment variables
CHANNEL_ACCESS_TOKEN = os.getenv("CHANNEL_ACCESS_TOKEN")
CHANNEL_SECRET = os.getenv("CHANNEL_SECRET")

if not CHANNEL_ACCESS_TOKEN or not CHANNEL_SECRET:
    raise ValueError("Missing LINE credentials. Please set CHANNEL_ACCESS_TOKEN and CHANNEL_SECRET in .env.")

# Configure LINE API and webhook handler
configuration = Configuration(access_token=CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)

@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers.get('X-Line-Signature', None)
    if signature is None:
        app.logger.info("X-Line-Signature header missing")
        abort(400)  # Bad request if the signature is missing

    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        app.logger.info("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'

@handler.add(MessageEvent, message=TextMessageContent)
def handle_message(event):
    user_id = event.source.user_id  # Get the user's ID
    user_message = event.message.text.lower()  # Convert user message to lowercase

    # Check if the user is trying to register
    
    if user_message.startswith("login"):
        reply_text = "https://ankitsk964.github.io/bot/"
    elif user_message.startswith("admin"):
        reply_text = "https://ankitsk964.github.io/bot/admin/"
    elif any(greeting in user_message for greeting in ["hello", "hi", "hii"]):
        reply_text = "Hello! How are you?"
    else:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a helpful assistant. Please respond to user queries."),
            ("user", f"Question: {user_message}")
        ])
        llm = Ollama(model="llama2")
        output_parser = StrOutputParser()
        chain = prompt | llm | output_parser
        reply_text = chain.invoke({"input": user_message})


    # Reply to the user
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        line_bot_api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=reply_text)]
            )
        )


if __name__ == "__main__":
    app.run()
