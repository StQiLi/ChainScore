from openai import OpenAI
import json

def format_crypto_wallet_history(file_path):
    # Read the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    # Initialize the formatted text
    formatted_text = "Crypto Wallet History:\n"
    
    # Loop through each transaction and format the text
    for i, transaction in enumerate(data, start=1):
        formatted_text += f"   from_address: {transaction['from_address']}\n"
        formatted_text += f"   to_address: {transaction['to_address']}\n"
        formatted_text += f"   Date: {transaction['block_timestamp']}\n"
        formatted_text += f"   Type: {transaction['type'].capitalize()}\n\n"
    
    return formatted_text

# Make sure to replace 'your-api-key' with your actual OpenAI API key
client = OpenAI(api_key='apikey')


# Load the JSON file
with open('history.json', 'r') as file:
    history_data = json.load(file)

# Convert the JSON data to a string if needed
history_str = json.dumps(history_data)

file_path = 'history.json'
formatted_history = format_crypto_wallet_history(file_path)

# Call the OpenAI API
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "system", "content": "Here is a wallet history in JSON format:" +  formatted_history + "\n\n Please given me the results for total number of transactions that took place, \
        and the number of transactions per month on average. Please respond in the format: \n \
            Total Transactions: <Number> \n Average Transactions Per Month: <Decimal>"}],
    max_tokens=300
)

# Print the response
print(response.choices[0].message.content)



