import json
from moralis import evm_api

api_key = "API-KEY"

params = {
    "chain": "avalanche",
    "order": "DESC",
    "address": "0xD5E3375E10d8854aD5386050B9F8716233d3cc8D"
}

address = params["address"]

result = evm_api.transaction.get_wallet_transactions(
    api_key=api_key,
    params=params,
)

# Extract only the required fields, filter out transactions where value is 0, convert value, and add transaction type
filtered_result = [
    {
        "from_address": tx["from_address"],
        "to_address": tx["to_address"],
        "value": round(float(tx["value"]) * 10**-18, 2),
        "block_timestamp": tx["block_timestamp"],
        "type": "sent" if tx["from_address"].lower() == address.lower() else "received"
    } 
    for tx in result["result"]
    if tx["value"] != "0" and tx["from_address"].lower() != tx["to_address"].lower()
]

# Clear the file by opening it in write mode and immediately closing it
open('actualHistory.json', 'w').close()

# Write the filtered result to the file
with open('history.json', 'w') as file:
    json.dump(filtered_result, file, indent=4)
