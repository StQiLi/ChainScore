"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFunction = void 0;
var axios_1 = require("axios");
var rpcEndpoints = {
    mainnet: 'https://rpc.mainnet.near.org',
    testnet: 'https://rpc.testnet.near.org',
    betanet: 'https://rpc.betanet.near.org',
    localnet: 'http://localhost:3030',
};
var nearRpcRequest = function (endpoint, id, method, params) { return __awaiter(void 0, void 0, void 0, function () {
    var requestData, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestData = {
                    "jsonrpc": "2.0",
                    "id": id,
                    "method": method,
                    "params": params,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(endpoint, requestData)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_1 = _a.sent();
                console.error('Error making RPC request:', error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
var getStatus = function (network, id, method, params) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = rpcEndpoints[network];
                return [4 /*yield*/, nearRpcRequest(endpoint, id, method, params)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var testFunction = function (targetaccount) { return __awaiter(void 0, void 0, void 0, function () {
    var transactions, blockHeight, blockHeightMaxCheck, block, blockTimestamp, i, chunkHash, chunk, _i, _a, transaction, transferAmount, _b, _c, action, transactionStatus, transactionDetails, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                transactions = [];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 16, , 17]);
                return [4 /*yield*/, getStatus('testnet', 'dontcare', 'block', { "finality": "final" })];
            case 2:
                blockHeight = (_d.sent()).result.header.height;
                blockHeightMaxCheck = 1000;
                console.log(blockHeight);
                _d.label = 3;
            case 3:
                if (!(blockHeight > 0 && blockHeightMaxCheck > 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, getStatus('testnet', 'dontcare', 'block', { "block_id": blockHeight })];
            case 4:
                block = _d.sent();
                if (!(block.result !== undefined)) return [3 /*break*/, 14];
                blockTimestamp = new Date(parseInt(block.result.header.timestamp_nanosec) / 1e6).toISOString();
                console.log("Processing block ".concat(blockHeight, " at ").concat(blockTimestamp));
                i = 0;
                _d.label = 5;
            case 5:
                if (!(i < block.result.header.chunks_included)) return [3 /*break*/, 14];
                chunkHash = block.result.chunks[i].chunk_hash;
                return [4 /*yield*/, getStatus('testnet', 'dontcare', 'chunk', { "chunk_id": chunkHash })];
            case 6:
                chunk = _d.sent();
                _i = 0, _a = chunk.result.transactions;
                _d.label = 7;
            case 7:
                if (!(_i < _a.length)) return [3 /*break*/, 13];
                transaction = _a[_i];
                if (!(transaction.signer_id === targetaccount || transaction.receiver_id === targetaccount)) return [3 /*break*/, 12];
                transferAmount = 0;
                // console.log(transferAmount);
                for (_b = 0, _c = transaction.actions; _b < _c.length; _b++) {
                    action = _c[_b];
                    if (action.Transfer) {
                        // console.log("action:", action);
                        // console.log("action.Transfer:", action.Transfer);
                        transferAmount += parseInt(action.Transfer.deposit, 10);
                        // console.log(transferAmount);
                    }
                }
                transactionStatus = Object();
                if (!(transaction.receiver_id === targetaccount)) return [3 /*break*/, 9];
                return [4 /*yield*/, getStatus('testnet', 'dontcare', 'EXPERIMENTAL_tx_status', { tx_hash: transaction.hash, sender_account_id: transaction.signer_id })];
            case 8:
                transactionStatus = _d.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, getStatus('testnet', 'dontcare', 'EXPERIMENTAL_tx_status', { tx_hash: transaction.hash, sender_account_id: transaction.receiver_id })];
            case 10:
                transactionStatus = _d.sent();
                _d.label = 11;
            case 11:
                // console.log("obtained transaction status");
                // console.log(transactionStatus);
                if (transactionStatus.result.status.SuccessValue !== undefined) {
                    transactionDetails = {
                        blockNumber: block.result.header.height,
                        timestamp: blockTimestamp,
                        transactionId: transaction.hash,
                        receiverId: transaction.receiver_id,
                        signerId: transaction.signer_id,
                        status: 'success',
                        amount: transferAmount / 1e24, // Convert yoctoNEAR to NEAR
                    };
                    transactions.push(transactionDetails);
                    // console.log(transactionDetails);
                }
                _d.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 7];
            case 13:
                i++;
                return [3 /*break*/, 5];
            case 14:
                blockHeight--;
                blockHeightMaxCheck--;
                return [3 /*break*/, 3];
            case 15: return [2 /*return*/, transactions];
            case 16:
                error_2 = _d.sent();
                console.error('Error:', error_2);
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.testFunction = testFunction;
