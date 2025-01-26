import { 
  Cell,
  Slice, 
  Address, 
  Builder, 
  beginCell, 
  TupleReader, 
  Dictionary, 
  contractAddress, 
  ContractProvider, 
  Sender, 
  Contract, 
  ContractABI, 
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.code);
      b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export type StdAddress = {
  $$type: 'StdAddress';
  workchain: bigint;
  address: bigint;
}

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 8);
      b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(8);
  let _address = sc_0.loadUintBig(256);
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export type VarAddress = {
  $$type: 'VarAddress';
  workchain: bigint;
  address: Slice;
}

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 32);
      b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(32);
  let _address = sc_0.loadRef().asSlice();
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounced);
      b_0.storeAddress(src.sender);
      b_0.storeInt(src.value, 257);
      b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounce);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.value, 257);
      b_0.storeInt(src.mode, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
      if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
      if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

export type Installment = {
  $$type: 'Installment';
  from_chain: bigint;
  target_chain: bigint;
  amount: bigint;
  nonce: bigint;
  from_token: Cell;
  to_token: Cell;
  recipient: Address;
}

export function storeInstallment(src: Installment) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1572369283, 32);
      b_0.storeUint(src.from_chain, 64);
      b_0.storeUint(src.target_chain, 64);
      b_0.storeCoins(src.amount);
      b_0.storeInt(src.nonce, 257);
      b_0.storeRef(src.from_token);
      b_0.storeRef(src.to_token);
      b_0.storeAddress(src.recipient);
  };
}

export function loadInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1572369283) { throw Error('Invalid prefix'); }
  let _from_chain = sc_0.loadUintBig(64);
  let _target_chain = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _nonce = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _recipient = sc_0.loadAddress();
  return { $$type: 'Installment' as const, from_chain: _from_chain, target_chain: _target_chain, amount: _amount, nonce: _nonce, from_token: _from_token, to_token: _to_token, recipient: _recipient };
}

export type SignerAndSignature = {
  $$type: 'SignerAndSignature';
  signature: Slice;
  key: bigint;
}

export function storeSignerAndSignature(src: SignerAndSignature) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.signature.asCell());
      b_0.storeUint(src.key, 256);
  };
}

export function loadSignerAndSignature(slice: Slice) {
  let sc_0 = slice;
  let _signature = sc_0.loadRef().asSlice();
  let _key = sc_0.loadUintBig(256);
  return { $$type: 'SignerAndSignature' as const, signature: _signature, key: _key };
}

function dictValueParserSignerAndSignature(): DictionaryValue<SignerAndSignature> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSignerAndSignature(src)).endCell());
      },
      parse: (src) => {
          return loadSignerAndSignature(src.loadRef().beginParse());
      }
  }
}

export type ReceiveInstallment = {
  $$type: 'ReceiveInstallment';
  installment: Installment;
  signatures: Dictionary<bigint, SignerAndSignature>;
  len: bigint;
  tx_hash: bigint;
  id: bigint;
}

export function storeReceiveInstallment(src: ReceiveInstallment) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(953435710, 32);
      b_0.store(storeInstallment(src.installment));
      let b_1 = new Builder();
      b_1.storeDict(src.signatures, Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature());
      b_1.storeInt(src.len, 257);
      b_1.storeUint(src.tx_hash, 256);
      b_1.storeInt(src.id, 257);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadReceiveInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 953435710) { throw Error('Invalid prefix'); }
  let _installment = loadInstallment(sc_0);
  let sc_1 = sc_0.loadRef().beginParse();
  let _signatures = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSignerAndSignature(), sc_1);
  let _len = sc_1.loadIntBig(257);
  let _tx_hash = sc_1.loadUintBig(256);
  let _id = sc_1.loadIntBig(257);
  return { $$type: 'ReceiveInstallment' as const, installment: _installment, signatures: _signatures, len: _len, tx_hash: _tx_hash, id: _id };
}

export type FreezeTon = {
  $$type: 'FreezeTon';
  target_chain: bigint;
  to_token: Cell;
  to: Cell;
  from_token: Cell;
  amount: bigint;
}

export function storeFreezeTon(src: FreezeTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3943853515, 32);
      b_0.storeUint(src.target_chain, 64);
      b_0.storeRef(src.to_token);
      b_0.storeRef(src.to);
      b_0.storeRef(src.from_token);
      b_0.storeCoins(src.amount);
  };
}

export function loadFreezeTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3943853515) { throw Error('Invalid prefix'); }
  let _target_chain = sc_0.loadUintBig(64);
  let _to_token = sc_0.loadRef();
  let _to = sc_0.loadRef();
  let _from_token = sc_0.loadRef();
  let _amount = sc_0.loadCoins();
  return { $$type: 'FreezeTon' as const, target_chain: _target_chain, to_token: _to_token, to: _to, from_token: _from_token, amount: _amount };
}

export type OutgoingTransaction = {
  $$type: 'OutgoingTransaction';
  id: bigint;
  amount: bigint;
  from_token: Cell;
  to_token: Cell;
  to: Cell;
  target_chain_id: bigint;
}

export function storeOutgoingTransaction(src: OutgoingTransaction) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1673830231, 32);
      b_0.storeUint(src.id, 256);
      b_0.storeCoins(src.amount);
      b_0.storeRef(src.from_token);
      b_0.storeRef(src.to_token);
      b_0.storeRef(src.to);
      b_0.storeUint(src.target_chain_id, 64);
  };
}

export function loadOutgoingTransaction(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1673830231) { throw Error('Invalid prefix'); }
  let _id = sc_0.loadUintBig(256);
  let _amount = sc_0.loadCoins();
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _to = sc_0.loadRef();
  let _target_chain_id = sc_0.loadUintBig(64);
  return { $$type: 'OutgoingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, to: _to, target_chain_id: _target_chain_id };
}

export type IncomingTransaction = {
  $$type: 'IncomingTransaction';
  id: bigint;
  amount: bigint;
  from_token: Cell;
  to_token: Cell;
  target_chain_id: bigint;
  to: Address;
}

export function storeIncomingTransaction(src: IncomingTransaction) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1311663233, 32);
      b_0.storeUint(src.id, 256);
      b_0.storeCoins(src.amount);
      b_0.storeRef(src.from_token);
      b_0.storeRef(src.to_token);
      b_0.storeUint(src.target_chain_id, 64);
      b_0.storeAddress(src.to);
  };
}

export function loadIncomingTransaction(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1311663233) { throw Error('Invalid prefix'); }
  let _id = sc_0.loadUintBig(256);
  let _amount = sc_0.loadCoins();
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _target_chain_id = sc_0.loadUintBig(64);
  let _to = sc_0.loadAddress();
  return { $$type: 'IncomingTransaction' as const, id: _id, amount: _amount, from_token: _from_token, to_token: _to_token, target_chain_id: _target_chain_id, to: _to };
}

export type InstallmentOut = {
  $$type: 'InstallmentOut';
  amount: bigint;
  to: string;
  target_chain: bigint;
  token_id: bigint;
}

export function storeInstallmentOut(src: InstallmentOut) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(src.amount, 256);
      b_0.storeStringRefTail(src.to);
      b_0.storeUint(src.target_chain, 64);
      b_0.storeInt(src.token_id, 257);
  };
}

export function loadInstallmentOut(slice: Slice) {
  let sc_0 = slice;
  let _amount = sc_0.loadUintBig(256);
  let _to = sc_0.loadStringRefTail();
  let _target_chain = sc_0.loadUintBig(64);
  let _token_id = sc_0.loadIntBig(257);
  return { $$type: 'InstallmentOut' as const, amount: _amount, to: _to, target_chain: _target_chain, token_id: _token_id };
}

export type ReleaseTokens = {
  $$type: 'ReleaseTokens';
  to: Address;
  amount: bigint;
  body: Cell | null;
}

export function storeReleaseTokens(src: ReleaseTokens) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(169475742, 32);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.amount, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
  };
}

export function loadReleaseTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 169475742) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _amount = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'ReleaseTokens' as const, to: _to, amount: _amount, body: _body };
}

export type JettonBurnNotification = {
  $$type: 'JettonBurnNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Slice;
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2078119902, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      b_0.storeAddress(src.response_destination);
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0;
  return { $$type: 'JettonBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type JettonMint = {
  $$type: 'JettonMint';
  origin: Address;
  receiver: Address;
  amount: bigint;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Slice;
}

export function storeJettonMint(src: JettonMint) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2310479113, 32);
      b_0.storeAddress(src.origin);
      b_0.storeAddress(src.receiver);
      b_0.storeInt(src.amount, 257);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
  let _origin = sc_0.loadAddress();
  let _receiver = sc_0.loadAddress();
  let _amount = sc_0.loadIntBig(257);
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0;
  return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type JettonTransfer = {
  $$type: 'JettonTransfer';
  query_id: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address | null;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell | null;
}

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
  };
}

export function loadJettonTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

export type TokenTransferNotification = {
  $$type: 'TokenTransferNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  forward_payload: Slice;
}

export function storeTokenTransferNotification(src: TokenTransferNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1935855772, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _forward_payload = sc_0;
  return { $$type: 'TokenTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

export type TokenExcesses = {
  $$type: 'TokenExcesses';
  query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

export type StonfiSwap = {
  $$type: 'StonfiSwap';
  otherTokenWallet: Address;
  refundAddress: Address;
  excessesAddress: Address;
  deadline: bigint;
  additionalData: SwapAdditionalData;
}

export function storeStonfiSwap(src: StonfiSwap) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1717886506, 32);
      b_0.storeAddress(src.otherTokenWallet);
      b_0.storeAddress(src.refundAddress);
      b_0.storeAddress(src.excessesAddress);
      b_0.storeUint(src.deadline, 64);
      let b_1 = new Builder();
      b_1.store(storeSwapAdditionalData(src.additionalData));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadStonfiSwap(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1717886506) { throw Error('Invalid prefix'); }
  let _otherTokenWallet = sc_0.loadAddress();
  let _refundAddress = sc_0.loadAddress();
  let _excessesAddress = sc_0.loadAddress();
  let _deadline = sc_0.loadUintBig(64);
  let sc_1 = sc_0.loadRef().beginParse();
  let _additionalData = loadSwapAdditionalData(sc_1);
  return { $$type: 'StonfiSwap' as const, otherTokenWallet: _otherTokenWallet, refundAddress: _refundAddress, excessesAddress: _excessesAddress, deadline: _deadline, additionalData: _additionalData };
}

export type SwapAdditionalData = {
  $$type: 'SwapAdditionalData';
  minOut: bigint;
  receiverAddress: Address;
  fwdGas: bigint;
  customPayload: Cell | null;
  refundFwdGas: bigint;
  refundPayload: Cell | null;
  refFee: bigint;
  referralAddress: Address | null;
}

export function storeSwapAdditionalData(src: SwapAdditionalData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeCoins(src.minOut);
      b_0.storeAddress(src.receiverAddress);
      b_0.storeCoins(src.fwdGas);
      if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.refundFwdGas);
      if (src.refundPayload !== null && src.refundPayload !== undefined) { b_0.storeBit(true).storeRef(src.refundPayload); } else { b_0.storeBit(false); }
      b_0.storeUint(src.refFee, 16);
      b_0.storeAddress(src.referralAddress);
  };
}

export function loadSwapAdditionalData(slice: Slice) {
  let sc_0 = slice;
  let _minOut = sc_0.loadCoins();
  let _receiverAddress = sc_0.loadAddress();
  let _fwdGas = sc_0.loadCoins();
  let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _refundFwdGas = sc_0.loadCoins();
  let _refundPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _refFee = sc_0.loadUintBig(16);
  let _referralAddress = sc_0.loadMaybeAddress();
  return { $$type: 'SwapAdditionalData' as const, minOut: _minOut, receiverAddress: _receiverAddress, fwdGas: _fwdGas, customPayload: _customPayload, refundFwdGas: _refundFwdGas, refundPayload: _refundPayload, refFee: _refFee, referralAddress: _referralAddress };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
}

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2490013878, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2952335191, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1829761339, 32);
      b_0.storeUint(src.queryId, 64);
      b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export type DeleteChain = {
  $$type: 'DeleteChain';
  chain_id: bigint;
}

export function storeDeleteChain(src: DeleteChain) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(308842230, 32);
      b_0.storeInt(src.chain_id, 257);
  };
}

export function loadDeleteChain(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 308842230) { throw Error('Invalid prefix'); }
  let _chain_id = sc_0.loadIntBig(257);
  return { $$type: 'DeleteChain' as const, chain_id: _chain_id };
}

export type DeleteModule = {
  $$type: 'DeleteModule';
  step: bigint;
}

export function storeDeleteModule(src: DeleteModule) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3720596336, 32);
      b_0.storeInt(src.step, 257);
  };
}

export function loadDeleteModule(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3720596336) { throw Error('Invalid prefix'); }
  let _step = sc_0.loadIntBig(257);
  return { $$type: 'DeleteModule' as const, step: _step };
}

export type DeleteStategies = {
  $$type: 'DeleteStategies';
  chain_id: bigint;
  from_token: bigint;
  to_token: bigint;
}

export function storeDeleteStategies(src: DeleteStategies) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1721311172, 32);
      b_0.storeInt(src.chain_id, 257);
      b_0.storeInt(src.from_token, 257);
      b_0.storeInt(src.to_token, 257);
  };
}

export function loadDeleteStategies(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1721311172) { throw Error('Invalid prefix'); }
  let _chain_id = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _to_token = sc_0.loadIntBig(257);
  return { $$type: 'DeleteStategies' as const, chain_id: _chain_id, from_token: _from_token, to_token: _to_token };
}

export type DeleteToken = {
  $$type: 'DeleteToken';
  symbol: string;
}

export function storeDeleteToken(src: DeleteToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1711896016, 32);
      b_0.storeStringRefTail(src.symbol);
  };
}

export function loadDeleteToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1711896016) { throw Error('Invalid prefix'); }
  let _symbol = sc_0.loadStringRefTail();
  return { $$type: 'DeleteToken' as const, symbol: _symbol };
}

export type DeleteValidator = {
  $$type: 'DeleteValidator';
  candidate: Address;
}

export function storeDeleteValidator(src: DeleteValidator) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1954510119, 32);
      b_0.storeAddress(src.candidate);
  };
}

export function loadDeleteValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1954510119) { throw Error('Invalid prefix'); }
  let _candidate = sc_0.loadAddress();
  return { $$type: 'DeleteValidator' as const, candidate: _candidate };
}

export type Pause = {
  $$type: 'Pause';
}

export function storePause() {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2051344601, 32);
  };
}

export function loadPause(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2051344601) { throw Error('Invalid prefix'); }
  return { $$type: 'Pause' as const };
}

export type SetAdmin = {
  $$type: 'SetAdmin';
  newAdmin: Address;
}

export function storeSetAdmin(src: SetAdmin) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2713466466, 32);
      b_0.storeAddress(src.newAdmin);
  };
}

export function loadSetAdmin(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2713466466) { throw Error('Invalid prefix'); }
  let _newAdmin = sc_0.loadAddress();
  return { $$type: 'SetAdmin' as const, newAdmin: _newAdmin };
}

export type SetChain = {
  $$type: 'SetChain';
  name: string;
  chain_id: bigint;
}

export function storeSetChain(src: SetChain) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3430403683, 32);
      b_0.storeStringRefTail(src.name);
      b_0.storeInt(src.chain_id, 257);
  };
}

export function loadSetChain(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3430403683) { throw Error('Invalid prefix'); }
  let _name = sc_0.loadStringRefTail();
  let _chain_id = sc_0.loadIntBig(257);
  return { $$type: 'SetChain' as const, name: _name, chain_id: _chain_id };
}

export type SetCFO = {
  $$type: 'SetCFO';
  newCFO: Address;
}

export function storeSetCFO(src: SetCFO) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3542740611, 32);
      b_0.storeAddress(src.newCFO);
  };
}

export function loadSetCFO(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3542740611) { throw Error('Invalid prefix'); }
  let _newCFO = sc_0.loadAddress();
  return { $$type: 'SetCFO' as const, newCFO: _newCFO };
}

export type SetModule = {
  $$type: 'SetModule';
  step: bigint;
  module: Address;
}

export function storeSetModule(src: SetModule) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2089213538, 32);
      b_0.storeInt(src.step, 257);
      b_0.storeAddress(src.module);
  };
}

export function loadSetModule(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2089213538) { throw Error('Invalid prefix'); }
  let _step = sc_0.loadIntBig(257);
  let _module = sc_0.loadAddress();
  return { $$type: 'SetModule' as const, step: _step, module: _module };
}

export type SetValidator = {
  $$type: 'SetValidator';
  candidate: Address;
}

export function storeSetValidator(src: SetValidator) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1653987471, 32);
      b_0.storeAddress(src.candidate);
  };
}

export function loadSetValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1653987471) { throw Error('Invalid prefix'); }
  let _candidate = sc_0.loadAddress();
  return { $$type: 'SetValidator' as const, candidate: _candidate };
}

export type SetStrategies = {
  $$type: 'SetStrategies';
  chain_id: bigint;
  from_token: bigint;
  to_token: bigint;
  foreign: Steps;
  incomming: Steps;
  local: Steps;
}

export function storeSetStrategies(src: SetStrategies) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3174462983, 32);
      b_0.storeInt(src.chain_id, 257);
      b_0.storeInt(src.from_token, 257);
      b_0.storeInt(src.to_token, 257);
      let b_1 = new Builder();
      b_1.store(storeSteps(src.foreign));
      b_1.store(storeSteps(src.incomming));
      b_1.store(storeSteps(src.local));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadSetStrategies(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3174462983) { throw Error('Invalid prefix'); }
  let _chain_id = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _to_token = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _foreign = loadSteps(sc_1);
  let _incomming = loadSteps(sc_1);
  let _local = loadSteps(sc_1);
  return { $$type: 'SetStrategies' as const, chain_id: _chain_id, from_token: _from_token, to_token: _to_token, foreign: _foreign, incomming: _incomming, local: _local };
}

export type SetToken = {
  $$type: 'SetToken';
  address: Address;
  decimals: bigint;
  emmet_lp: Address;
  symbol: string;
  swap_pool: Address;
  swap_router: Address;
  wallet: Address;
}

export function storeSetToken(src: SetToken) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(679330248, 32);
      b_0.storeAddress(src.address);
      b_0.storeUint(src.decimals, 8);
      b_0.storeAddress(src.emmet_lp);
      b_0.storeStringRefTail(src.symbol);
      b_0.storeAddress(src.swap_pool);
      let b_1 = new Builder();
      b_1.storeAddress(src.swap_router);
      b_1.storeAddress(src.wallet);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadSetToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 679330248) { throw Error('Invalid prefix'); }
  let _address = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  let _emmet_lp = sc_0.loadAddress();
  let _symbol = sc_0.loadStringRefTail();
  let _swap_pool = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _swap_router = sc_1.loadAddress();
  let _wallet = sc_1.loadAddress();
  return { $$type: 'SetToken' as const, address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}

export type Unpause = {
  $$type: 'Unpause';
}

export function storeUnpause() {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2378902809, 32);
  };
}

export function loadUnpause(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2378902809) { throw Error('Invalid prefix'); }
  return { $$type: 'Unpause' as const };
}

export type UpdateChainFee = {
  $$type: 'UpdateChainFee';
  chain_id: bigint;
  strategy_step: bigint;
  gas_amount: bigint;
}

export function storeUpdateChainFee(src: UpdateChainFee) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1453661226, 32);
      b_0.storeInt(src.chain_id, 257);
      b_0.storeUint(src.strategy_step, 8);
      b_0.storeInt(src.gas_amount, 257);
  };
}

export function loadUpdateChainFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1453661226) { throw Error('Invalid prefix'); }
  let _chain_id = sc_0.loadIntBig(257);
  let _strategy_step = sc_0.loadUintBig(8);
  let _gas_amount = sc_0.loadIntBig(257);
  return { $$type: 'UpdateChainFee' as const, chain_id: _chain_id, strategy_step: _strategy_step, gas_amount: _gas_amount };
}

export type UpdateConsensusFee = {
  $$type: 'UpdateConsensusFee';
  amount: bigint;
}

export function storeUpdateConsensusFee(src: UpdateConsensusFee) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4061306702, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadUpdateConsensusFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4061306702) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'UpdateConsensusFee' as const, amount: _amount };
}

export type UpdateMinimumTxFee = {
  $$type: 'UpdateMinimumTxFee';
  amount: bigint;
}

export function storeUpdateMinimumTxFee(src: UpdateMinimumTxFee) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2996339999, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadUpdateMinimumTxFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2996339999) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'UpdateMinimumTxFee' as const, amount: _amount };
}

export type UpdateProtocolFee = {
  $$type: 'UpdateProtocolFee';
  amount: bigint;
}

export function storeUpdateProtocolFee(src: UpdateProtocolFee) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2604971543, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadUpdateProtocolFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2604971543) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'UpdateProtocolFee' as const, amount: _amount };
}

export type WithdrawGas = {
  $$type: 'WithdrawGas';
  amount: bigint;
}

export function storeWithdrawGas(src: WithdrawGas) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(602125092, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadWithdrawGas(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 602125092) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'WithdrawGas' as const, amount: _amount };
}

export type Token = {
  $$type: 'Token';
  address: Address;
  decimals: bigint;
  emmet_lp: Address;
  symbol: string;
  swap_pool: Address;
  swap_router: Address;
  wallet: Address;
}

export function storeToken(src: Token) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.address);
      b_0.storeUint(src.decimals, 8);
      b_0.storeAddress(src.emmet_lp);
      b_0.storeStringRefTail(src.symbol);
      b_0.storeAddress(src.swap_pool);
      let b_1 = new Builder();
      b_1.storeAddress(src.swap_router);
      b_1.storeAddress(src.wallet);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadToken(slice: Slice) {
  let sc_0 = slice;
  let _address = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  let _emmet_lp = sc_0.loadAddress();
  let _symbol = sc_0.loadStringRefTail();
  let _swap_pool = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _swap_router = sc_1.loadAddress();
  let _wallet = sc_1.loadAddress();
  return { $$type: 'Token' as const, address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}

function loadGetterTupleToken(source: TupleReader) {
  let _address = source.readAddress();
  let _decimals = source.readBigNumber();
  let _emmet_lp = source.readAddress();
  let _symbol = source.readString();
  let _swap_pool = source.readAddress();
  let _swap_router = source.readAddress();
  let _wallet = source.readAddress();
  return { $$type: 'Token' as const, address: _address, decimals: _decimals, emmet_lp: _emmet_lp, symbol: _symbol, swap_pool: _swap_pool, swap_router: _swap_router, wallet: _wallet };
}

function dictValueParserToken(): DictionaryValue<Token> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeToken(src)).endCell());
      },
      parse: (src) => {
          return loadToken(src.loadRef().beginParse());
      }
  }
}

export type Chain = {
  $$type: 'Chain';
  name: string;
  chain_id: bigint;
}

export function storeChain(src: Chain) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeStringRefTail(src.name);
      b_0.storeInt(src.chain_id, 257);
  };
}

export function loadChain(slice: Slice) {
  let sc_0 = slice;
  let _name = sc_0.loadStringRefTail();
  let _chain_id = sc_0.loadIntBig(257);
  return { $$type: 'Chain' as const, name: _name, chain_id: _chain_id };
}

function loadGetterTupleChain(source: TupleReader) {
  let _name = source.readString();
  let _chain_id = source.readBigNumber();
  return { $$type: 'Chain' as const, name: _name, chain_id: _chain_id };
}

function dictValueParserChain(): DictionaryValue<Chain> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChain(src)).endCell());
      },
      parse: (src) => {
          return loadChain(src.loadRef().beginParse());
      }
  }
}

export type ForeignFees = {
  $$type: 'ForeignFees';
  i: Dictionary<bigint, bigint>;
}

export function storeForeignFees(src: ForeignFees) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
  };
}

export function loadForeignFees(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
  return { $$type: 'ForeignFees' as const, i: _i };
}

function dictValueParserForeignFees(): DictionaryValue<ForeignFees> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeForeignFees(src)).endCell());
      },
      parse: (src) => {
          return loadForeignFees(src.loadRef().beginParse());
      }
  }
}

export type Steps = {
  $$type: 'Steps';
  path: Dictionary<bigint, bigint>;
  size: bigint;
}

export function storeSteps(src: Steps) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.path, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
      b_0.storeInt(src.size, 257);
  };
}

export function loadSteps(slice: Slice) {
  let sc_0 = slice;
  let _path = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
  let _size = sc_0.loadIntBig(257);
  return { $$type: 'Steps' as const, path: _path, size: _size };
}

function loadGetterTupleSteps(source: TupleReader) {
  let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
  let _size = source.readBigNumber();
  return { $$type: 'Steps' as const, path: _path, size: _size };
}

export type Strategies = {
  $$type: 'Strategies';
  foreign: Steps;
  incomming: Steps;
  local: Steps;
}

export function storeStrategies(src: Strategies) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.store(storeSteps(src.foreign));
      b_0.store(storeSteps(src.incomming));
      b_0.store(storeSteps(src.local));
  };
}

export function loadStrategies(slice: Slice) {
  let sc_0 = slice;
  let _foreign = loadSteps(sc_0);
  let _incomming = loadSteps(sc_0);
  let _local = loadSteps(sc_0);
  return { $$type: 'Strategies' as const, foreign: _foreign, incomming: _incomming, local: _local };
}

function loadGetterTupleStrategies(source: TupleReader) {
  const _foreign = loadGetterTupleSteps(source);
  const _incomming = loadGetterTupleSteps(source);
  const _local = loadGetterTupleSteps(source);
  return { $$type: 'Strategies' as const, foreign: _foreign, incomming: _incomming, local: _local };
}

function dictValueParserStrategies(): DictionaryValue<Strategies> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStrategies(src)).endCell());
      },
      parse: (src) => {
          return loadStrategies(src.loadRef().beginParse());
      }
  }
}

export type ToTokenMap = {
  $$type: 'ToTokenMap';
  i: Dictionary<bigint, Strategies>;
}

export function storeToTokenMap(src: ToTokenMap) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserStrategies());
  };
}

export function loadToTokenMap(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserStrategies(), sc_0);
  return { $$type: 'ToTokenMap' as const, i: _i };
}

function dictValueParserToTokenMap(): DictionaryValue<ToTokenMap> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeToTokenMap(src)).endCell());
      },
      parse: (src) => {
          return loadToTokenMap(src.loadRef().beginParse());
      }
  }
}

export type FromTokenMap = {
  $$type: 'FromTokenMap';
  i: Dictionary<bigint, ToTokenMap>;
}

export function storeFromTokenMap(src: FromTokenMap) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserToTokenMap());
  };
}

export function loadFromTokenMap(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserToTokenMap(), sc_0);
  return { $$type: 'FromTokenMap' as const, i: _i };
}

function dictValueParserFromTokenMap(): DictionaryValue<FromTokenMap> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeFromTokenMap(src)).endCell());
      },
      parse: (src) => {
          return loadFromTokenMap(src.loadRef().beginParse());
      }
  }
}

export type GrantRole = {
  $$type: 'GrantRole';
  to: Address;
  role_id: bigint;
}

export function storeGrantRole(src: GrantRole) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(174185305, 32);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.role_id, 257);
  };
}

export function loadGrantRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 174185305) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _role_id = sc_0.loadIntBig(257);
  return { $$type: 'GrantRole' as const, to: _to, role_id: _role_id };
}

export type RenounceRole = {
  $$type: 'RenounceRole';
  role_id: bigint;
  address: Address;
}

export function storeRenounceRole(src: RenounceRole) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(389201441, 32);
      b_0.storeInt(src.role_id, 257);
      b_0.storeAddress(src.address);
  };
}

export function loadRenounceRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 389201441) { throw Error('Invalid prefix'); }
  let _role_id = sc_0.loadIntBig(257);
  let _address = sc_0.loadAddress();
  return { $$type: 'RenounceRole' as const, role_id: _role_id, address: _address };
}

export type RevokeRole = {
  $$type: 'RevokeRole';
  to: Address;
  role_id: bigint;
}

export function storeRevokeRole(src: RevokeRole) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1363080030, 32);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.role_id, 257);
  };
}

export function loadRevokeRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1363080030) { throw Error('Invalid prefix'); }
  let _to = sc_0.loadAddress();
  let _role_id = sc_0.loadIntBig(257);
  return { $$type: 'RevokeRole' as const, to: _to, role_id: _role_id };
}

export type RoleData = {
  $$type: 'RoleData';
  roles: Dictionary<Address, boolean>;
  admin_role: bigint;
}

export function storeRoleData(src: RoleData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeDict(src.roles, Dictionary.Keys.Address(), Dictionary.Values.Bool());
      b_0.storeInt(src.admin_role, 257);
  };
}

export function loadRoleData(slice: Slice) {
  let sc_0 = slice;
  let _roles = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
  let _admin_role = sc_0.loadIntBig(257);
  return { $$type: 'RoleData' as const, roles: _roles, admin_role: _admin_role };
}

function dictValueParserRoleData(): DictionaryValue<RoleData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeRoleData(src)).endCell());
      },
      parse: (src) => {
          return loadRoleData(src.loadRef().beginParse());
      }
  }
}

export type UpdateRoleAdmin = {
  $$type: 'UpdateRoleAdmin';
  role_id: bigint;
  role_admin: bigint;
}

export function storeUpdateRoleAdmin(src: UpdateRoleAdmin) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(620382153, 32);
      b_0.storeInt(src.role_id, 257);
      b_0.storeInt(src.role_admin, 257);
  };
}

export function loadUpdateRoleAdmin(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 620382153) { throw Error('Invalid prefix'); }
  let _role_id = sc_0.loadIntBig(257);
  let _role_admin = sc_0.loadIntBig(257);
  return { $$type: 'UpdateRoleAdmin' as const, role_id: _role_id, role_admin: _role_admin };
}

export type EmmetBridge$Data = {
  $$type: 'EmmetBridge$Data';
  admin: Address;
  cfo: Address;
  chains: Dictionary<bigint, Chain>;
  chainId: bigint;
  consensus_fee: bigint;
  foreign_fees: Dictionary<bigint, ForeignFees>;
  incomming_txs: Dictionary<bigint, boolean>;
  locked: Dictionary<bigint, bigint>;
  min_tx_fee: bigint;
  modules: Dictionary<bigint, Address>;
  nonce: bigint;
  paused: boolean;
  protocol_fee: bigint;
  roles: Dictionary<bigint, RoleData>;
  token_strategies: Dictionary<bigint, FromTokenMap>;
  threshold: bigint;
  tokens: Dictionary<bigint, Token>;
  TVL: bigint;
  validators: Dictionary<bigint, Address>;
  validator_count: bigint;
}

export function storeEmmetBridge$Data(src: EmmetBridge$Data) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.admin);
      b_0.storeAddress(src.cfo);
      b_0.storeDict(src.chains, Dictionary.Keys.BigInt(257), dictValueParserChain());
      b_0.storeInt(src.chainId, 257);
      let b_1 = new Builder();
      b_1.storeInt(src.consensus_fee, 257);
      b_1.storeDict(src.foreign_fees, Dictionary.Keys.BigInt(257), dictValueParserForeignFees());
      b_1.storeDict(src.incomming_txs, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool());
      b_1.storeDict(src.locked, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
      b_1.storeInt(src.min_tx_fee, 257);
      let b_2 = new Builder();
      b_2.storeDict(src.modules, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
      b_2.storeInt(src.nonce, 257);
      b_2.storeBit(src.paused);
      b_2.storeInt(src.protocol_fee, 257);
      b_2.storeDict(src.roles, Dictionary.Keys.BigInt(257), dictValueParserRoleData());
      b_2.storeDict(src.token_strategies, Dictionary.Keys.BigInt(257), dictValueParserFromTokenMap());
      b_2.storeInt(src.threshold, 257);
      let b_3 = new Builder();
      b_3.storeDict(src.tokens, Dictionary.Keys.BigInt(257), dictValueParserToken());
      b_3.storeInt(src.TVL, 257);
      b_3.storeDict(src.validators, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
      b_3.storeInt(src.validator_count, 257);
      b_2.storeRef(b_3.endCell());
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadEmmetBridge$Data(slice: Slice) {
  let sc_0 = slice;
  let _admin = sc_0.loadAddress();
  let _cfo = sc_0.loadAddress();
  let _chains = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserChain(), sc_0);
  let _chainId = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _consensus_fee = sc_1.loadIntBig(257);
  let _foreign_fees = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserForeignFees(), sc_1);
  let _incomming_txs = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), sc_1);
  let _locked = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
  let _min_tx_fee = sc_1.loadIntBig(257);
  let sc_2 = sc_1.loadRef().beginParse();
  let _modules = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_2);
  let _nonce = sc_2.loadIntBig(257);
  let _paused = sc_2.loadBit();
  let _protocol_fee = sc_2.loadIntBig(257);
  let _roles = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserRoleData(), sc_2);
  let _token_strategies = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserFromTokenMap(), sc_2);
  let _threshold = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _tokens = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserToken(), sc_3);
  let _TVL = sc_3.loadIntBig(257);
  let _validators = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_3);
  let _validator_count = sc_3.loadIntBig(257);
  return { $$type: 'EmmetBridge$Data' as const, admin: _admin, cfo: _cfo, chains: _chains, chainId: _chainId, consensus_fee: _consensus_fee, foreign_fees: _foreign_fees, incomming_txs: _incomming_txs, locked: _locked, min_tx_fee: _min_tx_fee, modules: _modules, nonce: _nonce, paused: _paused, protocol_fee: _protocol_fee, roles: _roles, token_strategies: _token_strategies, threshold: _threshold, tokens: _tokens, TVL: _TVL, validators: _validators, validator_count: _validator_count };
}

type EmmetBridge_init_args = {
  $$type: 'EmmetBridge_init_args';
  admin: Address;
  cfo: Address;
  validator: Address;
}

function initEmmetBridge_init_args(src: EmmetBridge_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.admin);
      b_0.storeAddress(src.cfo);
      b_0.storeAddress(src.validator);
  };
}

async function EmmetBridge_init(admin: Address, cfo: Address, validator: Address) {
  const __code = Cell.fromBase64('te6ccgICASAAAQAAUj8AAAEU/wD0pBP0vPLICwABAgFiAAIAAwPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VQBBgAsAC0CASAABAAFAgEgAAYABwIBIAAaABsCASAAzgDPAgEgAAgACQIBIAAKAAsCASAAEgATAgFIAAwADQIBIAAOAA8CaKmM2zwRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+VSrbPGzGbIYBBgDUAgFYANUA1gIZr0/tnm2eK4gvh7YgwAEGANgCASAAEAARAhiou9s82zxXEF8PbEEBBgEXAgN6oADZANoCAVgAFAAVAgEgABYAFwJUqR/bPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xBAQYA3QJyqWfbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIyAQYA3gIBWAAYABkCAVgA5QDmAhel07Z5tniuIL4e2IMBBgDfAk+mU7Z4IiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtnjZztjPAQYA4AIBIAAcAB0CASAAIAAhAgEgAB4AHwIDeyAA7gDvAhmyA/bPNs8VxBfD2xBgAQYA6QIBIADqAOsCASAAIgAjAgEgAP0A/gIBSAAkACUCAVgAKgArABCqvu1E0NIAAQIBIAAmACcCF6fBtnm2eK4gvh7YgwEGAPICAVgAKAApAlm6bbPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PbCIygBBgDzAnG+vbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygBBgD0AhirvNs82zxXEF8PbEEBBgEfAmyrt9s8ERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvlUq2zxXEF8PbEEBBgD1BPABkjB/4HAh10nCH5UwINcLH94gghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQONRGPrqPKjDTHwGCEDjURj668uCB2zwH1AHQ9ASBAQHXANP/gQEB1wAwEEtsG9s8f+AgghDrEm3LuuMCIIIQe92X3roALgAvADAAMQH0AREUARETINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WH/QAHYEBAc8AC8iBAQHPABr0ABj0ABb0ABSBAQHPAALI9ACBAQHPABLKABKBAQHPABL0ABIANgB+0x8BghBduHODuvLggdM/0z/6AIEBAdcA1NT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFxYVFEMwA/IyERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDAsRFQsKERQKCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPIEe+Smz8vRWHQFWHQFWHQERHVYcVhxWHMhVYNs8yfkAADcAOAA5ATgw0x8BghDrEm3LuvLggdM/1NTU+gBVQGwV2zx/AFEE0o8IMNs8bBbbPH/gIIIQc2LQnLqOuDDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU4CDAACLXScEhsJhbMvgnbxACf+AgghASaI72ugAyADMANAA1ALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAHyNV8DERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERSBHvkps/L0gTxuyMnQVhcB+QEB+QG98vQRFdM/IVYSugBXAtwxMhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9MjJ0FYWAfkBAfkBuuMPfwBdAF4E6o6YMNMfAYIQEmiO9rry4IGBAQHXAAEx2zx/4CCCEN3Dy3C6jpgw0x8BghDdw8twuvLggYEBAdcAATHbPH/gIIIQZpkfxLqOpDDTHwGCEGaZH8S68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f+AgghBmCXXQugBxAHIAcwB0AEj0ABOBAQHPAAPI9AAUgQEBzwAV9AATgQEBzwDJWMzJWMzJAcwC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEfADoAcoIQXbhzg1AIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHEggDiAxEVIboBERUB8vSBNXcRGlYUgQEBLwJxQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiswERGwHy9BESERQREhERERMREREQERIREA8REQ8OERAOVR0BERkBVhkBERYAOwDUIG6SMG2d0PQEgQEB1wBZbBJvAuKBHughbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igT11IW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQH6cCGBAQH0hW+lIJESlTFtMm0B4pCOTiBukjBtnNDUAdAB0/9ZbBJvAuIgbvLQgG8iJ4EBASJZ9AxvoZIwbd9us5klWfkQkwGkAd6RW+KBAQEjAln0eG+lIJQC1DBYlTFtMm0B4ugQI18DgV2XMia+8vRWF9DT/zBWF9DT/zAAPAL6ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEdAlYbVhjbPB2BAQEBERh/cSFulVtZ9FowmMgBzwBBM/RC4gURGQUEERcEAxEVAwIRFAIBERgBERMAPQA+AcgRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGFYXAD8BgshVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREwwLERILChERCgkREAkQjxB+EFwQSxA6SYcQVgNQVUQUAFAC5oEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDltsIoEfkwHDAPL0gQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroXwNXFFcUVxQREBETERAPERIPDhERDg0REA0QzxC+VSoA+ABAA/IRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFVYVggCZXCHCApMBwQuSMXDi8vRWFcAG4w+BAQEgVhYDERgBAEEAQgBDArxXFVYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWF1YXVhrbPOMNAEQARQLOVhXABI7fERXACI6zggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8jiOBH5Py8BETERQRExESERMREhERERIREREQEREREA8REA9VDuLjDQBKAEsAtEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQNASOgQEBVEcUWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJ2xhf3NWEKoAbXCIVhJRWRBZBBA6UKLIVWDbPMkUE0EwbW0A4QBGAEcATwKQggCWrPhBbyQTXwMsc6kEvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWFlYZiH9zJIIB5GCgEDRBMEADBG1t2zwwE6ECAEkAvwA6AAAAAEVtbWV0QnJpZGdlOiBUb2tlbiBVTkxPQ0sB7IIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLg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ERERExERERAREhEQDxERDw4REA5VHQH4ERXUMCBujhswVxMRERETEREREBESERAPEREPDhEQDhDfVRzgIG7y0IDQ0z8hVhK6jhtbVxMRERETEREREBESERAPEREPDhEQDhDfVRzg1NTUMCLQ0/8wIdDT/zARExEYERMREhEXERIREREWEREREBEVERAPERQPDhEYDgBfAXgNERcNDBEWDAsRFQsKERQKCREYCQgRFwgHERYHBhEVBgURFAUEERgEAxEXAwIRFgIBERUBERpWFFYWVhwAYAP+gQEBVhVAFFn0DW+hkjBt3yBukjBtn9DUAdABgQEB1wBZbBJvAuKBQ/EBbrPy9IEBASYCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigUWZAW6z8vSBAQElAln0DW+hkjBt3yBukjBtjofQ2zxsF28H4oIAq6EBbrPy9COBAQFWFwDhAOEAYQTuWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfigV3PASBu8tCAbydsYfhBbyQQI18DxwXy9BETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1mERtWGts8BBEXBAMRFQMpAwIRGQIBERcBERVaFRTIVVDbPMkA4QBiAGMAZAG4ERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERRWF1YXVhcAZQAsghBjxJ9XUAfLHxXL/1AD+gLMzMzLPwB8yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHFVBiExQD/IEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDmxCggCIzQHDAPL0ERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAREYAVYXAREX2zwKpAD4APYAZgF+gQEBIFYXWVn0hG+lIJZQI9cAMFiWbCFtMm0B4pCK6Fs6VxRXFFcUERARExEQDxESDw4REQ4NERANEM8QvlUqAGcD5hETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWChApCBEUCAcRFgcQJgURFAUEERYEECMCERQCAREWAREUVhSCAJlcIcICkwHBC5IxcOLy9FYUwAPjD4EBASBWGAMRGAEAaABpAGoBulcUVheC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72Kuo4yggCWrPhBbyQTXwNWGlYXoC2gvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhgToALjDgBrAdJWFMAFjjpXFIIAlqz4QW8kE18DLKcDVhcBoL7y9BESERMREhERERIREREQEREREA8REA9VDlYXVhlbggDPOvLwjqYRFMAHjh6CAIjN8vAREhETERIRERESEREREBERERAPERAPVQ7jDeIAbACwQTP0eG+lIJZQI9cAMFiWbCFtMm0B4hEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhDNEKwQmxCKEHkQaBBXEEYQNQDiggCWrPhBbyQTXwMsqgBWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGYEBAVRfAFJAQTP0DG+hlAHXADCSW23iIG6RMJYgbvLQgKDigQEBIAQREARDMCFulVtZ9FowmMgBzwBBM/RC4gwCuFYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDVhcBoL7y9BESERMREhERERIREREQEREREA8REA9VDlYXVhnbPOMNAG0AbgLkgQEBVEYTWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiICBu8tCAbydsYQEgbvLQgG8nEEZfBo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCLHBbPy5UTIghAPin6lAcsfUtDLP1AD+gIiAOEAbwFeggCWrPhBbyQTXwNWGlYXoC2gvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhgAcAGuINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFm0B9AAt+gJtAfQAyS2qAAJzWX9ENG1t2zwwAL8CsiSBAQGC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72KWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJxBGXwYtqwASoHNYf0EzbW1t2zwwAOEAvwLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUVhKBAQEiWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4m6zmwEREoEBAfRaMBERkTDiERQAxQB1A/ARExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhTbPBEUyAGCEN3Dy3BYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREAxQB2AHcD1BETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREV2zxWFFYXVhfbPAIRFAIBERYBERUAxQB4AHkEzI6VMNMfAYIQZgl10Lry4IHUAdAx2zx/4CCCEHR/dSe6jrEw0x8BghB0f3UnuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEHpFCNm64wIgghChvDZiugB7AHwAfQB+AILIAYIQEmiO9ljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgHwERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUBWFIIAmVwhwgKTAcELkjFw4vL0KoEBAVYWWfQMb6GSMG3fbrOeAREUAQqBAQH0WjAJEROSVxTiERIRExESAMwAGBEQEREREA8REA9VDgG8KIEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBukl8E4CAgbvLQgG8hASBu8tCAbyGBAQEkWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpJfBeAgbvLQgG8hgQEBbQB6AJjIVSCCEGaZH8RQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREBETERAPERIPDhERDg0REA0Qz1UrAO4gbpIwbY4oIG7y0IBvJshVUEZUAvQAgQEBzwBAFAL0AIEBAc8AAgL0AIEBAc8AyeJBMBQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyRA4EiBulTBZ9FowlEEz9BXiBQPeERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU+QIkgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsF28H4m6zmVAEgQEB9FowA5Ew4hEUAMUA4QB/BPQRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhQg2zz5AiOBAQEiWfQMb6GSMG3fIiFukltwkscF4pFb4w1WE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwDFARkAgACBAXww0x8BghB6RQjZuvLggW0xMNs8KLOSfzneyItlBhdXNlZIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAfwDFBNyOsTDTHwGCEKG8NmK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQzHfOY7qOnTDTHwGCEMx3zmO68uCB1AHQAYEBAdcAWWwS2zx/4CCCENMp7oO64wIgghB8ht5iugCGAIcAiACJAIbIAYIQZgl10FjLH8hYzxbJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQD1UOAfxQA4EBAfRaMAGlERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAI0I6oAc6kEBFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMAggLcVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBVhUBHwCEAvhWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBERQRFREUERMRFBETERIRExESAR8AgwD6EREREhERERAREREQDxEQD1UOKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gYB2iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGERQAhQC2yAGCEHR/dSdYyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAxQCKArgRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8VhVWFQDFAI8BYjDTHwGCENMp7oO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH8AkASsjrgw0x8BghB8ht5iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghC9NnYHuo8IMNs8bBnbPH/gIIIQKH3ByLoAlgCXAJgAmQKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYV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gQEB1wABMds8fwCyBNS6jpgw0x8BghCymIUfuvLggYEBAdcAATHbPH/gIIIQm0S2F7qOmDDTHwGCEJtEthe68uCBgQEB1wABMds8f+AgghAj47Mkuo6YMNMfAYIQI+OzJLry4IGBAQHXAAEx2zx/4CCCEJRqmLa6ALQAtQC2ALcB1lYRgQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeKBAQFUEyIhbpVbWfRaMJjIAc8AQTP0QuKBAQEByAEB9ADJAxERAxIgbpUwWfRaMJRBM/QV4g4CERQCAREWAREVALEAkshVIIIQVqUcKlAEyx8SgQEBzwDLB4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEQERMREA8REg8OEREODREQDRDPVSsC7BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFFcQggD2L1YQwv/y9BEUyAGCEPISn05Yyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAAuACzADAREhETERIRERESEREREBERERAPERAPVQ4C9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFDyCAO8OLML/8vQRFMgBghCymIUfWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESALgAzAL0ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUOIIAvA4owv/y9BEUyAGCEJtEthdYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIAuADMA+YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8MvgnbxBWFL6SVhOU+CdvEOJWEgGAQHBVIG1tbds8MPgnbxARFMgBghAj47MkWMsfgQEBzwDJALgAvwC5BPSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgghBRPvNeuuMCIAC7ALwAvQC+AtImERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBAQERFNs8AhEWAgERFQFZ9A1voZIwbd8BDwC6AJDIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QwAA1iBukjBtndD0BIEBAdcAWWwSbwLiggDRTSFus/L0IG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKBGCshbrOYASBu8tCAwP+SMXDi8vQRERETEREREBESERAPEREPDhEQDlUdATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAAvwL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8AxQDBAXIw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLbPH8AxAK6ghAXMr4huo7IMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/4IIQJPpHybrjAjBwAMgAyQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgAwACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAEIVRzbPADCA9YRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFFYV2zzbPCaBAQFWF1n0DW+hkjBt3wDXAMoAwwH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREXf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDcCERUCAREWASBulTBZ9FowlEEz9BXiERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQDNAvQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3wDFAMYC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEXAMcBCFUc2zwAyADUIG6SMG2d0PQEgQEB1wBZbBJvAuKBFZQhbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igUKPIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQPWERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds82zwmgQEBVhdZ9A1voZIwbd8A1wDKAMsA3NMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZ/AvKCAMTt+EFvJBAjXwMRFREWERURFBEWERQRExEWERMREhEWERIREREWEREREBEWERAPERYPDhEWDg0RFg0MERYMCxEWCwoRFgoJERYJCBEWCAcRFgcGERYGBREWBQQRFgQDERYDAhEWAgERFts8AREVAfL0ERIRExESANIAzAH+IG6SMG2d0PQEgQEB1wBZbBJvAuIgbvLQgG8igQELAREXcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQERFshZAvQAgQEBzwDJEDcCERUCAREWASBulTBZ9FowlEEz9BXiERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQDNACQRERESEREREBERERAPERAPVQ4AEhBoEFcGEDVEAwIBIADQANECGbdXm2ebZ4riC+HtiDABBgEPApuya0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zxXEF8PbEGABBgDSAnOwkbbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygAQYA0wCigQEBKQJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBukltwjicgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IDiAViBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w5fBAD4AVSBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w4A+AJboTts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8VxBfD2xBgEGAPwCU6BHbPBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xBgEGANcAZIEBASgCWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIxAAIoAlOtds8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbEGABBgDcAlOrNs8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PbEGABBgDbAESBAQFTDlAzQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiAEKBAQEvAnFBM/QMb6GUAdcAMJJbbeIgbpIwcJUgbvLQgOIAeoEBASMCWfQMb6GSMG3fIG6OJTCNCGAAAAAA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');
  const __system = Cell.fromBase64('te6cckICASIAAQAAUksAAAEBwAABAQWhp0sAAgEU/wD0pBP0vPLICwADAgFiAAQApwPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VQBCgAFAKUE8AGSMH/gcCHXScIflTAg1wsf3iCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgghA41EY+uo8qMNMfAYIQONRGPrry4IHbPAfUAdD0BIEBAdcA0/+BAQHXADAQS2wb2zx/4CCCEOsSbcu64wIgghB73ZfeugAGAAcAIgApAH7THwGCEF24c4O68uCB0z/TP/oAgQEB1wDU1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgXFhUUQzAD8jIRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8gR75KbPy9FYdAVYdAVYdAREdVhxWHFYcyFVg2zzJ+QAACAAKAAsC0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEcAAkA1CBukjBtndD0BIEBAdcAWWwSbwLigR7oIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oE9dSFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0AcoIQXbhzg1AIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHEggDiAxEVIboBERUB8vSBNXcRGlYUgQEBLwJxQTP0DG+hlAHXADCSW23iIG6SMHCVIG7y0IDiswERGwHy9BESERQREhERERMREREQERIREA8REQ8OERAOVR0BERkBVhkBERYADAH6cCGBAQH0hW+lIJESlTFtMm0B4pCOTiBukjBtnNDUAdAB0/9ZbBJvAuIgbvLQgG8iJ4EBASJZ9AxvoZIwbd9us5klWfkQkwGkAd6RW+KBAQEjAln0eG+lIJQC1DBYlTFtMm0B4ugQI18DgV2XMia+8vRWF9DT/zBWF9DT/zAADQL6ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAjAhEdAlYbVhjbPB2BAQEBERh/cSFulVtZ9FowmMgBzwBBM/RC4gURGQUEERcEAxEVAwIRFAIBERgBERMADgAgAcgRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGFYXAA8C5oEBAVRJFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6YXwNtcFRxASHjDltsIoEfkwHDAPL0gQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikIroXwNXFFcUVxQREBETERAPERIPDhERDg0REA0QzxC+VSoA+QAQA/IRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFVYVggCZXCHCApMBwQuSMXDi8vRWFcAG4w+BAQEgVhYDERgBABEAGAAfArxXFVYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOs4IAlqz4QW8kE18DLKcDvvL0ERIRExESEREREhERERAREREQDxEQD1UOERRWF1YXVhrbPOMNABIAFgSOgQEBVEcUWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiIG7y0IBvJ2xhf3NWEKoAbXCIVhJRWRBZBBA6UKLIVWDbPMkUE0EwbW0AzwATABQAHgA6AAAAAEVtbWV0QnJpZGdlOiBUb2tlbiBVTkxPQ0sB7IIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AiFus5RwMsoA4w0AFQAKfwHKAMwCkIIAlqz4QW8kE18DLHOpBL7y9BESERMREhERERIREREQEREREA8REA9VDhEUVhZWGYh/cySCAeRgoBA0QTBAAwRtbds8MBOhAgAXAJMANgAAAABFbW1ldEJyaWRnZTogVE9OIFVOTE9DSwLOVhXABI7fERXACI6zggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8jiOBH5Py8BETERQRExESERMREhERERIREREQEREREA8REA9VDuLjDQAZABoC9IEBAVRHFFn0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbycQRl8Gcy+qAMjJXjESyFUgghAKGf6eUATLH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4skTfwRQM21tAM8AHgHAVxWCAL89VhiC8BpCGf5eYNY68qPMfc5v7Gm0XGtXGEl6YUjnwjKsh72KvfL0ggCWrPhBbyQTXwMsqgC+8vQREhETERIRERESEREREBERERAPERAPVQ4RFFYXVhdWGts8ABsE9IEBAVRHFFn0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbydfBshvAAFvjG1vjI0EUVtbWV0QnJpZGdlOiBNSU5Ug2zxzVhCqAPgobQRvIgHJkyFus5YBbyJZzMnoMdAQRkcwFlYTEEUQNAHIVVDbPMlBMH9QRG1tAM8AHAAdAB4AuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwDIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgEG2zwwAJMAtEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQNAGCyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADBETDAsREgsKEREKCREQCRCPEH4QXBBLEDpJhxBWA1BVRBQAIQBoghBOLmSBUAfLHxXL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgE4MNMfAYIQ6xJty7ry4IHTP9TU1PoAVUBsFds8fwAjA+ARExEYERMREhEXERIREREWEREREBEVERAPERQPDhEYDg0RFw0MERYMCxEVCwoRFAoJERgJCBEXCAcRFgcGERUGBREUBQQRGAQDERcDAhEWAgERFQERFIEe+Smz8vRWFdCDB9s8VhjQgwfbPIIA05IiACQAJAAlAAbXATAB/oLwGkIZ/l5g1jryo8x9zm/sabRca1cYSXphSOfCMqyHvYq68vQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFFYaVhYAJgP2VhaBAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0AM8AzwAnA/wRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdVhpZVhfbPAQRFAQDERYDKQMCERkCAREWAREYWhUUyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDgAOABFACgACkcVQ2QBBNKPCDDbPGwW2zx/4CCCEHNi0Jy6jrgw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFOAgwAAi10nBIbCYWzL4J28QAn/gIIIQEmiO9roAKgArADIARwCy0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzAB8jVfAxETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9IE8bsjJ0FYXAfkBAfkBvfL0ERXTPyFWEroALALcjurU1NQwItDT/zAh0NP/MBETERgRExESERcREhERERYREREQERUREA8RFA8OERgODREXDQwRFgwLERULChEUCgkRGAkIERcIBxEWBwYRFQYFERQFBBEYBAMRFwMCERYCAREVAREaVhRWFlYc4w0ALQAxA/6BAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0I4EBAVYXAM8AzwAuAvxZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+IgbvLQgG8nXwaBV3qNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQixwWz8vQRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkAzwAvA/4QeBBnEFYQRRA0QTAhAREXAREc2zyCAJas+EFvJBNfAy6rABOgEr7y9IF+N/hBbyQQI18DAREWAccFAREVAfL0CKQEERcEAxEVA1IDAhEZAgERFwERFVoVFMhVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA0REw0MERIMAPcARQAwADoLERELChEQChCfEI4QfRBsEFsQShBZSBYFUDNHFwA2W1cTERERExERERAREhEQDxERDw4REA4Q31UcAtwxMhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgR75KbPy9MjJ0FYWAfkBAfkBuuMPfwAzADQANFcUVxQRERETEREREBESERAPEREPDhEQDlUdAfgRFdQwIG6OGzBXExERERMREREQERIREA8REQ8OERAOEN9VHOAgbvLQgNDTPyFWErqOG1tXExERERMREREQERIREA8REQ8OERAOEN9VHODU1NQwItDT/zAh0NP/MBETERgRExESERcREhERERYREREQERUREA8RFA8OERgOADUBeA0RFw0MERYMCxEVCwoRFAoJERgJCBEXCAcRFgcGERUGBREUBQQRGAQDERcDAhEWAgERFQERGlYUVhZWHAA2A/6BAQFWFUAUWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4oFD8QFus/L0gQEBJgJZ9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBRZkBbrPy9IEBASUCWfQNb6GSMG3fIG6SMG2Oh9DbPGwXbwfiggCroQFus/L0I4EBAVYXAM8AzwA3BO5Z9A1voZIwbd8gbpIwbY6H0Ns8bBdvB+KBXc8BIG7y0IBvJ2xh+EFvJBAjXwPHBfL0ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHWYRG1Ya2zwEERcEAxEVAykDAhEZAgERFwERFVoVFMhVUNs8yQDPADgARQBGAbgRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFFYXVhdWFwA5A/yBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w5sQoIAiM0BwwDy9BEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMAERGAFWFwERF9s8CqQA+QD3ADoBfoEBASBWF1lZ9IRvpSCWUCPXADBYlmwhbTJtAeKQiuhbOlcUVxRXFBEQERMREA8REg8OEREODREQDRDPEL5VKgA7A+YRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoQKQgRFAgHERYHECYFERQFBBEWBBAjAhEUAgERFgERFFYUggCZXCHCApMBwQuSMXDi8vRWFMAD4w+BAQEgVhgDERgBADwAPgBEAbpXFFYXgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9irqOMoIAlqz4QW8kE18DVhpWF6AtoL7y9BESERMREhERERIREREQEREREA8REA9VDlYYE6AC4w4APQDiggCWrPhBbyQTXwMsqgBWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGYEBAVRfAFJAQTP0DG+hlAHXADCSW23iIG6RMJYgbvLQgKDigQEBIAQREARDMCFulVtZ9FowmMgBzwBBM/RC4gwB0lYUwAWOOlcUggCWrPhBbyQTXwMspwNWFwGgvvL0ERIRExESEREREhERERAREREQDxEQD1UOVhdWGVuCAM868vCOphEUwAeOHoIAiM3y8BESERMREhERERIREREQEREREA8REA9VDuMN4gA/ArhWF4LwGkIZ/l5g1jryo8x9zm/sabRca1cYSXphSOfCMqyHvYq6jrOCAJas+EFvJBNfAyynA1YXAaC+8vQREhETERIRERESEREREBERERAPERAPVQ5WF1YZ2zzjDQBAAEIC5IEBAVRGE1n0DW+hkjBt3yBukjBtjofQ2zxsF28H4iAgbvLQgG8nbGEBIG7y0IBvJxBGXwaNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQixwWz8uVEyIIQD4p+pQHLH1LQyz9QA/oCIgDPAEEBriDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZtAfQALfoCbQH0AMktqgACc1l/RDRtbds8MACTAV6CAJas+EFvJBNfA1YaVhegLaC+8vQREhETERIRERESEREREBERERAPERAPVQ5WGABDArIkgQEBgvAaQhn+XmDWOvKjzH3Ob+xptFxrVxhJemFI58IyrIe9iln0DW+hkjBt3yBukjBtjofQ2zxsF28H4iBu8tCAbycQRl8GLasAEqBzWH9BM21tbds8MADPAJMAsEEz9HhvpSCWUCPXADBYlmwhbTJtAeIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QzRCsEJsQihB5EGgQVxBGEDUALIIQY8SfV1AHyx8Vy/9QA/oCzMzMyz8AfMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4REw4NERINDBERDAsREAsQrxCeEI0QfBBrEFoQSRA4RxVQYhMUBOqOmDDTHwGCEBJojva68uCBgQEB1wABMds8f+AgghDdw8twuo6YMNMfAYIQ3cPLcLry4IGBAQHXAAEx2zx/4CCCEGaZH8S6jqQw0x8BghBmmR/EuvLggYEBAdcAgQEB1wCBAQHXAFUgbBPbPH/gIIIQZgl10LoASABKAE0AUQLuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUVhKBAQEiWfQNb6GSMG3fIG6SMG2f0NQB0AGBAQHXAFlsEm8C4m6zmwEREoEBAfRaMBERkTDiERQAmwBJAILIAYIQEmiO9ljLH4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgPwERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU2zwRFMgBghDdw8twWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERAJsASwBMAfARExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYUggCZXCHCApMBwQuSMXDi8vQqgQEBVhZZ9AxvoZIwbd9us54BERQBCoEBAfRaMAkRE5JXFOIREhETERIAoQAYERAREREQDxEQD1UOA9QRExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgERFds8VhRWF1YX2zwCERQCAREWAREVAJsATgBQAbwogQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SXwTgICBu8tCAbyEBIG7y0IBvIYEBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBukl8F4CBu8tCAbyGBAQFtAE8A7iBukjBtjiggbvLQgG8myFVQRlQC9ACBAQHPAEAUAvQAgQEBzwACAvQAgQEBzwDJ4kEwFCBulTBZ9FowlEEz9BXigQEBAcgBAfQAyUEwIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJEDgSIG6VMFn0WjCUQTP0FeIFAJjIVSCCEGaZH8RQBMsfEoEBAc8AgQEBzwCBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREBETERAPERIPDhERDg0REA0Qz1UrBMyOlTDTHwGCEGYJddC68uCB1AHQMds8f+AgghB0f3Unuo6xMNMfAYIQdH91J7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghB6RQjZuuMCIIIQobw2YroAUgBUAFsAXAPeERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYU+QIkgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsF28H4m6zmVAEgQEB9FowA5Ew4hEUAJsAzwBTAIbIAYIQZgl10FjLH8hYzxbJAczJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQD1UOBPQRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhQg2zz5AiOBAQEiWfQMb6GSMG3fIiFukltwkscF4pFb4w1WE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwCbARYAVQBYAfxQA4EBAfRaMAGlERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAI0I6oAc6kEBFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMAVgL4VhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQREUERURFBETERQRExESERMREgEcAFcA+hERERIREREQEREREA8REA9VDiiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGAtxWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbEFWFQEcAFkB2iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBC28hbrPy9CBu8tCAbyKBAQtQA3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGERQAWgC2yAGCEHR/dSdYyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERMREhERERIREREQEREREA8REA9VDgF8MNMfAYIQekUI2bry4IFtMTDbPCizkn853siLZQYXVzZWSM8WyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AH8AmwTcjrEw0x8BghChvDZiuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEMx3zmO6jp0w0x8BghDMd85juvLggdQB0AGBAQHXAFlsEts8f+AgghDTKe6DuuMCIIIQfIbeYroAXQBjAGUAbALuERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAmwBeApwREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfD2xBVhUBHwBfAv4ogQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTAR4AYALeVhNWE1YTVhNWE1YTVhNWExETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbDEBAR8AYQHeKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZXE1YTAGIAqsgBghChvDZiWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERESEREREBERERAPERAPVQ4CuBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zxWFVYVAJsAZADqgQEBUSHIWchYzxbJWMyBAQHPAMkDERQDIG6VMFn0WjCUQTP0FeIREQERFQERFMhZghDMd85jUAPLH8hYzxbJAcyBAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERETEREREBESERAPEREPDhEQDlUdAWIw0x8BghDTKe6DuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/AGYC7hETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERMRJxETERIRJhESERERJRERAJsAZwKcERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQXw9sQVYVARIAaAL+KIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu4wAgbvLQgG8igQELUAN/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAQLIWQL0AIEBAc8AyRA5EiBulTBZ9FowlEEz9BXiBlYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWEwEeAGkC3FYTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxBfDzRbARIAagHeKIEBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oELbyFus/L0IG7y0IBvIoEBC1ADcHEhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gZXElYTAGsAqsgBghDTKe6DWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIREBERERAPERAPVQ4ErI64MNMfAYIQfIbeYrry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gIIIQvTZ2B7qPCDDbPGwZ2zx/4CCCECh9wci6AG0AcQByAHcDyBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zxWFVYV2zwBERUBERQAmwBuAHAB6hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhWCAJlcIcICkwHBC5IxcOLy9BAqgQEBAgERFgERFQBvAHIgbpUwWfRaMJRBM/QU4hERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmwoQeRBoEFcQRhA1RAMAvshZghB8ht5iUAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARERETEREREBESERAPEREPDhEQDlUdAIjTHwGCEL02dge68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkC9ASBAQHXAFkyEGkQaBBnEEVDAAPwERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERwKCREbCQgRGggHERkHBhEYBgURFwUEERYEAxEVAwIRFAIBERwBERvbPFYaVhpWGlYaVhpWGlYaViNWI9s8CBEaCAcRGQcGERgGAJsAcwB1AeIugQEBKln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeJtVVFVQIEBAQbIVVBGVAL0AIEBAc8AQBQC9ACBAQHPAAIC9ACBAQHPAMlBMBQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMlBMAB0AFQgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQOBIgbpUwWfRaMJRBM/QV4gUBnAURFwUEERYEAxEVAwIRFAIBERwBERvIVYDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAKERMKCRESCQgREQgHERAHEG8QXhBNEDxLqQB2AHqCEL02dgdQCssfGIEBAc8AFoEBAc8AFIEBAc8AyFoC9ACBAQHPAEADAvQAgQEBzwBAAwL0AIEBAc8AyQHMBJ6PCDDbPGwX2zx/4CCCEGKV2I+6jrEw0x8BghBildiPuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEI3LLRm6AHgAeQB/AIMB7NMfAYIQKH3ByLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAA0ALMERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFYUVhtWG1YbVhtWG1YbAJsAegLogQEBJPkCEGheNBA3SHjIVWDbPMkQNhIgbpUwWfRaMJRBM/QV4gMGERQGBREaBQQRGQQDERgDAhEXAgERFgERFchVYNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREwwLERILChERCgkREAkQjxB+VWYAewB9AdZQdiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhTLB1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWM8WyQHMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQAwB8AIAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAeiCECh9wchQCMsfUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUywdYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWAB+AIAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMA/YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhTbPFYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMRExEnERMREhEmERIRERElEREAmwEVAIACnBEQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEF8PbEFWFQEcAIEC0iiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQORIgbpUwWfRaMJRBM/QV4gYRFAEeAIIAtsgBghBildiPWMsfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIRERESEREREBERERAPERAPVQ4E/o6/MNMfAYIQjcstGbry4IFtMTDbPCiScDneyIuFVucGF1c2VkjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wB/4CCCEFalHCq6jqEw0x8BghBWpRwquvLggYEBAdcA0weBAQHXAFUgbBPbPH/gIIIQ8hKfTrrjAiCCELKYhR8AmwCEAIcAigK8ERMRFhETERIRFRESERERFBERERARFhEQDxEVDw4RFA4NERYNDBEVDAsRFAsKERYKCREVCQgRFAgHERYHBhEVBgURFAUEERYEAxEVAwIRFAIBERYBERXbPFYUVhdWFwCOAIUB1lYRgQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6SMG2XIG7y0IBvIeKBAQFUEyIhbpVbWfRaMJjIAc8AQTP0QuKBAQEByAEB9ADJAxERAxIgbpUwWfRaMJRBM/QV4g4CERQCAREWAREVAIYAkshVIIIQVqUcKlAEyx8SgQEBzwDLB4EBAc8AyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEQERMREA8REg8OEREODREQDRDPVSsBMDDTHwGCEPISn0668uCBgQEB1wABMds8fwCIAuwRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8VhRXEIIA9i9WEML/8vQRFMgBghDyEp9OWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAI4AiQAwERIRExESEREREhERERAREREQDxEQD1UOBNS6jpgw0x8BghCymIUfuvLggYEBAdcAATHbPH/gIIIQm0S2F7qOmDDTHwGCEJtEthe68uCBgQEB1wABMds8f+AgghAj47Mkuo6YMNMfAYIQI+OzJLry4IGBAQHXAAEx2zx/4CCCEJRqmLa6AIsAjACNAJEC9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVA2zxWFDyCAO8OLML/8vQRFMgBghCymIUfWMsfgQEBzwDJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESAI4AoQL0ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUDbPFYUOIIAvA4owv/y9BEUyAGCEJtEthdYyx+BAQHPAMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhETERIAjgChA+YRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQNs8MvgnbxBWFL6SVhOU+CdvEOJWEgGAQHBVIG1tbds8MPgnbxARFMgBghAj47MkWMsfgQEBzwDJAI4AkwCQAtImERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBAQERFNs8AhEWAgERFQFZ9A1voZIwbd8BEgCPANYgbpIwbZ3Q9ASBAQHXAFlsEm8C4oIA0U0hbrPy9CBu8tCAbyIwgQEL+EFvJBAjXwNxQTP0Cm+hlAHXADCSW23igRgrIW6zmAEgbvLQgMD/kjFw4vL0ERERExERERAREhEQDxERDw4REA5VHQCQyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEMABPSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQCmHbWbqOuTDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8f+AgghBRPvNeuuMCIACSAJUAmQCeATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAAkwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgAlACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAL0ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8AmwCWAQhVHNs8AJcD1hETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhXbPNs8JoEBAVYXWfQNb6GSMG3fALgAoACYAf4gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBu8tCAbyKBAQsBERd/cSFulVtZ9FkwmMgBzwBBM/RB4oEBAREWyFkC9ACBAQHPAMkQNwIRFQIBERYBIG6VMFn0WjCUQTP0FeIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5AKMBcjDTHwGCEFE+81668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEts8fwCaAvQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3wCbAJ0C0iYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIEBAREU2zwCERYCAREVAVn0DW+hkjBt3wEfAJwA1CBukjBtndD0BIEBAdcAWWwSbwLigRWUIW6z8vQgbvLQgG8iMIEBC/hBbyQQI18DcUEz9ApvoZQB1wAwkltt4oFCjyFus5gBIG7y0IDA/5IxcOLy9BERERMREREQERIREA8REQ8OERAOVR0BCFUc2zwAnwK6ghAXMr4huo7IMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/4IIQJPpHybrjAjBwAJ8ApAPWERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWFds82zwmgQEBVhdZ9A1voZIwbd8AuACgAKIC8oIAxO34QW8kECNfAxEVERYRFREUERYRFBETERYRExESERYREhERERYREREQERYREA8RFg8OERYODREWDQwRFgwLERYLChEWCgkRFgkIERYIBxEWBwYRFgYFERYFBBEWBAMRFgMCERYCAREW2zwBERUB8vQREhETERIArAChACQRERESEREREBERERAPERAPVQ4B/iBukjBtndD0BIEBAdcAWWwSbwLiIG7y0IBvIoEBCwERF3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBERbIWQL0AIEBAc8AyRA3AhEVAgERFgEgbpUwWfRaMJRBM/QV4hERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkAowASEGgQVwYQNUQDANzTHwGCECT6R8m68uCBgQEB1wCBAQHXAFlsEiiBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKBVOUhbrPy9CBu8tCAbyIwgQEBAshZAvQAgQEBzwDJEDkSIG6VMFn0WjCUQTP0FeIGfwH0AREUARETINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WH/QAHYEBAc8AC8iBAQHPABr0ABj0ABb0ABSBAQHPAALI9ACBAQHPABLKABKBAQHPABL0ABIApgBI9AATgQEBzwADyPQAFIEBAc8AFfQAE4EBAc8AyVjMyVjMyQHMAgEgAKgA2AIBIACpALACASAAqgCvAgEgAKsArQKbsmtASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHNs8VxBfD2xBgAQoArACigQEBKQJZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4iBukltwjicgbvLQgG8iMIEBC1hxQTP0Cm+hlAHXADCSW23iIG6SMHDgIG7y0IDiAnOwkbbPBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL5VKts8VxJXEF8PbCIygAQoArgFYgQEBVEkUWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbphfA21wVHEBIeMOXwQA+QIZt1ebZ5tniuIL4e2IMAEKARICASAAsQDDAgEgALIAuQIBSACzALUCaKmM2zwRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+VSrbPGzGbIYBCgC0AVSBAQFUSRRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBumF8DbXBUcQEh4w4A+QIBWAC2ALcCW6E7bPBETERURExESERQREhERERMREREQERIREA8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');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initEmmetBridge_init_args({ $$type: 'EmmetBridge_init_args', admin, cfo, validator })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const EmmetBridge_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
  50: { message: `Account state size exceeded limits` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  1348: { message: `EmmetBridge: Wallet for Jetton not set` },
  2927: { message: `AccessControl: Role ID doesn't exist` },
  5524: { message: `AccessControl: Role ADMIN is undefined` },
  6187: { message: `AccessControl: Doesn't have the CFO role` },
  7912: { message: `AccessControl: Role VALIDATOR is undefined` },
  7929: { message: `EmmetBridge: The contract is paused` },
  7947: { message: `AccessControl: BadConfirmation` },
  8083: { message: `EmmetBridge: unsupported incoming strategy` },
  10858: { message: `AccessControl: Doesn't have the BRIDGE role` },
  12450: { message: `AccessControl: Role BRIDGE is undefined` },
  13687: { message: `EmmetBridge: Previously processed TX` },
  15470: { message: `EmmetBridge: Burned with no bridge instructions` },
  15733: { message: `AccessControl: Doesn't have the VALIDATOR role` },
  17039: { message: `AccessControl: Doesn't have the ADMIN role` },
  17393: { message: `EmmetBridge: unsupported chain` },
  17817: { message: `EmmetBridge: unsupported from_token` },
  21733: { message: `AccessControl: Role doesn't exist` },
  22394: { message: `EmmetBridge: JettonWallet not set` },
  23959: { message: `EmmetBridge: BFT threshold not reached.` },
  24015: { message: `EmmetBridge: Invalid Sender` },
  27930: { message: `Validator already exists` },
  32311: { message: `EmmetBridge: Unauthorised Burn notification` },
  35021: { message: `EmmetBridge: unsupported outgoing strategy` },
  38572: { message: `EmmetBridge: Insufficient fee` },
  39260: { message: `EmmetBridge: Unsupported step` },
  43937: { message: `EmmetBridge: unsupported to_token` },
  48142: { message: `Negative protocol fee prohibited` },
  48957: { message: `EmmetBridge: Cannot MINT Toncoin` },
  50413: { message: `AccessControl: Doesnt have the role` },
  53050: { message: `EmmetBridge: Unsupported flow. Instead burn & notify the bridge!` },
  53581: { message: `AccessControl: Role CFO is undefined` },
  54162: { message: `EmmetBridge: in FreezeTon from_token must be TON` },
  57859: { message: `EmmetBridge: Installment hash mismatch` },
  61198: { message: `Negative TX fee prohibited` },
  63023: { message: `EmmetBridge: Negative consensus fee prohibited` },
}

const EmmetBridge_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
  {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"Installment","header":1572369283,"fields":[{"name":"from_chain","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SignerAndSignature","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
  {"name":"ReceiveInstallment","header":953435710,"fields":[{"name":"installment","type":{"kind":"simple","type":"Installment","optional":false}},{"name":"signatures","type":{"kind":"dict","key":"int","value":"SignerAndSignature","valueFormat":"ref"}},{"name":"len","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tx_hash","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"FreezeTon","header":3943853515,"fields":[{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to","type":{"kind":"simple","type":"cell","optional":false}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"OutgoingTransaction","header":1673830231,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to","type":{"kind":"simple","type":"cell","optional":false}},{"name":"target_chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"IncomingTransaction","header":1311663233,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"to_token","type":{"kind":"simple","type":"cell","optional":false}},{"name":"target_chain_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"InstallmentOut","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"to","type":{"kind":"simple","type":"string","optional":false}},{"name":"target_chain","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"token_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"ReleaseTokens","header":169475742,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"JettonBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"TokenTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"StonfiSwap","header":1717886506,"fields":[{"name":"otherTokenWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"refundAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"excessesAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"additionalData","type":{"kind":"simple","type":"SwapAdditionalData","optional":false}}]},
  {"name":"SwapAdditionalData","header":null,"fields":[{"name":"minOut","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"receiverAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"fwdGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"refundFwdGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"refundPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"refFee","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"referralAddress","type":{"kind":"simple","type":"address","optional":true}}]},
  {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"DeleteChain","header":308842230,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"DeleteModule","header":3720596336,"fields":[{"name":"step","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"DeleteStategies","header":1721311172,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"DeleteToken","header":1711896016,"fields":[{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}}]},
  {"name":"DeleteValidator","header":1954510119,"fields":[{"name":"candidate","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Pause","header":2051344601,"fields":[]},
  {"name":"SetAdmin","header":2713466466,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetChain","header":3430403683,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"SetCFO","header":3542740611,"fields":[{"name":"newCFO","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetModule","header":2089213538,"fields":[{"name":"step","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"module","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetValidator","header":1653987471,"fields":[{"name":"candidate","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetStrategies","header":3174462983,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"foreign","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"incomming","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"local","type":{"kind":"simple","type":"Steps","optional":false}}]},
  {"name":"SetToken","header":679330248,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"emmet_lp","type":{"kind":"simple","type":"address","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"swap_pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"swap_router","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Unpause","header":2378902809,"fields":[]},
  {"name":"UpdateChainFee","header":1453661226,"fields":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"strategy_step","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"gas_amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"UpdateConsensusFee","header":4061306702,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"UpdateMinimumTxFee","header":2996339999,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"UpdateProtocolFee","header":2604971543,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"WithdrawGas","header":602125092,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"Token","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"emmet_lp","type":{"kind":"simple","type":"address","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"swap_pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"swap_router","type":{"kind":"simple","type":"address","optional":false}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Chain","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"ForeignFees","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"int"}}]},
  {"name":"Steps","header":null,"fields":[{"name":"path","type":{"kind":"dict","key":"int","value":"int"}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"Strategies","header":null,"fields":[{"name":"foreign","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"incomming","type":{"kind":"simple","type":"Steps","optional":false}},{"name":"local","type":{"kind":"simple","type":"Steps","optional":false}}]},
  {"name":"ToTokenMap","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"Strategies","valueFormat":"ref"}}]},
  {"name":"FromTokenMap","header":null,"fields":[{"name":"i","type":{"kind":"dict","key":"int","value":"ToTokenMap","valueFormat":"ref"}}]},
  {"name":"GrantRole","header":174185305,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"RenounceRole","header":389201441,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"RevokeRole","header":1363080030,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"RoleData","header":null,"fields":[{"name":"roles","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"admin_role","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"UpdateRoleAdmin","header":620382153,"fields":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"role_admin","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"EmmetBridge$Data","header":null,"fields":[{"name":"admin","type":{"kind":"simple","type":"address","optional":false}},{"name":"cfo","type":{"kind":"simple","type":"address","optional":false}},{"name":"chains","type":{"kind":"dict","key":"int","value":"Chain","valueFormat":"ref"}},{"name":"chainId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"consensus_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"foreign_fees","type":{"kind":"dict","key":"int","value":"ForeignFees","valueFormat":"ref"}},{"name":"incomming_txs","type":{"kind":"dict","key":"int","value":"bool"}},{"name":"locked","type":{"kind":"dict","key":"int","value":"int"}},{"name":"min_tx_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"modules","type":{"kind":"dict","key":"int","value":"address"}},{"name":"nonce","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"paused","type":{"kind":"simple","type":"bool","optional":false}},{"name":"protocol_fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"roles","type":{"kind":"dict","key":"int","value":"RoleData","valueFormat":"ref"}},{"name":"token_strategies","type":{"kind":"dict","key":"int","value":"FromTokenMap","valueFormat":"ref"}},{"name":"threshold","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokens","type":{"kind":"dict","key":"int","value":"Token","valueFormat":"ref"}},{"name":"TVL","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"validators","type":{"kind":"dict","key":"int","value":"address"}},{"name":"validator_count","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const EmmetBridge_getters: ABIGetter[] = [
  {"name":"estimate_fee","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_admin","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"get_cfo","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"get_chain","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Chain","optional":false}},
  {"name":"get_min_tx_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_module","arguments":[{"name":"step","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"get_nonce","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_chain_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_consensus_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_locked","arguments":[{"name":"token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_paused","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
  {"name":"get_protocol_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_step_fee","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"step","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_threshold","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_token","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Token","optional":false}},
  {"name":"get_tvl","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_validator","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"get_validator_count","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"is_processed","arguments":[{"name":"hash","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
  {"name":"is_validator","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
  {"name":"admin_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"bridge_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"cfo_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"has_role","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
  {"name":"role_admin","arguments":[{"name":"role_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"validator_role_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"get_foreign_strategies","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Steps","optional":false}},
  {"name":"get_incoming_strategies","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Steps","optional":false}},
  {"name":"get_local_strategies","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Steps","optional":false}},
  {"name":"get_strategies","arguments":[{"name":"chain_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from_token","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to_token","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Strategies","optional":false}},
]

export const EmmetBridge_getterMapping: { [key: string]: string } = {
  'estimate_fee': 'getEstimateFee',
  'get_admin': 'getGetAdmin',
  'get_cfo': 'getGetCfo',
  'get_chain': 'getGetChain',
  'get_min_tx_fee': 'getGetMinTxFee',
  'get_module': 'getGetModule',
  'get_nonce': 'getGetNonce',
  'get_chain_id': 'getGetChainId',
  'get_consensus_fee': 'getGetConsensusFee',
  'get_locked': 'getGetLocked',
  'get_paused': 'getGetPaused',
  'get_protocol_fee': 'getGetProtocolFee',
  'get_step_fee': 'getGetStepFee',
  'get_threshold': 'getGetThreshold',
  'get_token': 'getGetToken',
  'get_tvl': 'getGetTvl',
  'get_validator': 'getGetValidator',
  'get_validator_count': 'getGetValidatorCount',
  'is_processed': 'getIsProcessed',
  'is_validator': 'getIsValidator',
  'admin_role_id': 'getAdminRoleId',
  'bridge_role_id': 'getBridgeRoleId',
  'cfo_role_id': 'getCfoRoleId',
  'has_role': 'getHasRole',
  'role_admin': 'getRoleAdmin',
  'validator_role_id': 'getValidatorRoleId',
  'get_foreign_strategies': 'getGetForeignStrategies',
  'get_incoming_strategies': 'getGetIncomingStrategies',
  'get_local_strategies': 'getGetLocalStrategies',
  'get_strategies': 'getGetStrategies',
}

const EmmetBridge_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
  {"receiver":"internal","message":{"kind":"typed","type":"ReceiveInstallment"}},
  {"receiver":"internal","message":{"kind":"typed","type":"FreezeTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"JettonBurnNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenTransferNotification"}},
  {"receiver":"internal","message":{"kind":"empty"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DeleteChain"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DeleteModule"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DeleteStategies"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DeleteToken"}},
  {"receiver":"internal","message":{"kind":"typed","type":"DeleteValidator"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Pause"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetAdmin"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetChain"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetCFO"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetModule"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetStrategies"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetToken"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetValidator"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Unpause"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateChainFee"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateConsensusFee"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateMinimumTxFee"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateProtocolFee"}},
  {"receiver":"internal","message":{"kind":"typed","type":"WithdrawGas"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
  {"receiver":"internal","message":{"kind":"typed","type":"GrantRole"}},
  {"receiver":"internal","message":{"kind":"typed","type":"RevokeRole"}},
  {"receiver":"internal","message":{"kind":"typed","type":"RenounceRole"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateRoleAdmin"}},
]

export class EmmetBridge implements Contract {
  
  static async init(admin: Address, cfo: Address, validator: Address) {
      return await EmmetBridge_init(admin, cfo, validator);
  }
  
  static async fromInit(admin: Address, cfo: Address, validator: Address) {
      const init = await EmmetBridge_init(admin, cfo, validator);
      const address = contractAddress(0, init);
      return new EmmetBridge(address, init);
  }
  
  static fromAddress(address: Address) {
      return new EmmetBridge(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  EmmetBridge_types,
      getters: EmmetBridge_getters,
      receivers: EmmetBridge_receivers,
      errors: EmmetBridge_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenExcesses | ReceiveInstallment | FreezeTon | JettonBurnNotification | TokenTransferNotification | null | DeleteChain | DeleteModule | DeleteStategies | DeleteToken | DeleteValidator | Pause | SetAdmin | SetChain | SetCFO | SetModule | SetStrategies | SetToken | SetValidator | Unpause | UpdateChainFee | UpdateConsensusFee | UpdateMinimumTxFee | UpdateProtocolFee | WithdrawGas | Deploy | GrantRole | RevokeRole | RenounceRole | UpdateRoleAdmin) {
      
      let body: Cell | null = null;
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
          body = beginCell().store(storeTokenExcesses(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReceiveInstallment') {
          body = beginCell().store(storeReceiveInstallment(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FreezeTon') {
          body = beginCell().store(storeFreezeTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonBurnNotification') {
          body = beginCell().store(storeJettonBurnNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenTransferNotification') {
          body = beginCell().store(storeTokenTransferNotification(message)).endCell();
      }
      if (message === null) {
          body = new Cell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteChain') {
          body = beginCell().store(storeDeleteChain(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteModule') {
          body = beginCell().store(storeDeleteModule(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteStategies') {
          body = beginCell().store(storeDeleteStategies(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteToken') {
          body = beginCell().store(storeDeleteToken(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteValidator') {
          body = beginCell().store(storeDeleteValidator(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Pause') {
          body = beginCell().store(storePause()).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAdmin') {
          body = beginCell().store(storeSetAdmin(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetChain') {
          body = beginCell().store(storeSetChain(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCFO') {
          body = beginCell().store(storeSetCFO(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetModule') {
          body = beginCell().store(storeSetModule(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetStrategies') {
          body = beginCell().store(storeSetStrategies(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetToken') {
          body = beginCell().store(storeSetToken(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetValidator') {
          body = beginCell().store(storeSetValidator(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Unpause') {
          body = beginCell().store(storeUnpause()).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateChainFee') {
          body = beginCell().store(storeUpdateChainFee(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateConsensusFee') {
          body = beginCell().store(storeUpdateConsensusFee(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateMinimumTxFee') {
          body = beginCell().store(storeUpdateMinimumTxFee(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProtocolFee') {
          body = beginCell().store(storeUpdateProtocolFee(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawGas') {
          body = beginCell().store(storeWithdrawGas(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GrantRole') {
          body = beginCell().store(storeGrantRole(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RevokeRole') {
          body = beginCell().store(storeRevokeRole(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RenounceRole') {
          body = beginCell().store(storeRenounceRole(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRoleAdmin') {
          body = beginCell().store(storeUpdateRoleAdmin(message)).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getEstimateFee(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(from_token);
      builder.writeNumber(to_token);
      let source = (await provider.get('estimate_fee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetAdmin(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_admin', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getGetCfo(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_cfo', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getGetChain(provider: ContractProvider, chain_id: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      let source = (await provider.get('get_chain', builder.build())).stack;
      const result = loadGetterTupleChain(source);
      return result;
  }
  
  async getGetMinTxFee(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_min_tx_fee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetModule(provider: ContractProvider, step: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(step);
      let source = (await provider.get('get_module', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getGetNonce(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_nonce', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetChainId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_chain_id', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetConsensusFee(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_consensus_fee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetLocked(provider: ContractProvider, token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(token);
      let source = (await provider.get('get_locked', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetPaused(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_paused', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
  async getGetProtocolFee(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_protocol_fee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetStepFee(provider: ContractProvider, chain_id: bigint, step: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(step);
      let source = (await provider.get('get_step_fee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetThreshold(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_threshold', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetToken(provider: ContractProvider, key: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(key);
      let source = (await provider.get('get_token', builder.build())).stack;
      const result = loadGetterTupleToken(source);
      return result;
  }
  
  async getGetTvl(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_tvl', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetValidator(provider: ContractProvider, index: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(index);
      let source = (await provider.get('get_validator', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getGetValidatorCount(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('get_validator_count', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getIsProcessed(provider: ContractProvider, hash: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(hash);
      let source = (await provider.get('is_processed', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
  async getIsValidator(provider: ContractProvider, address: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(address);
      let source = (await provider.get('is_validator', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
  async getAdminRoleId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('admin_role_id', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getBridgeRoleId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('bridge_role_id', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getCfoRoleId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('cfo_role_id', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getHasRole(provider: ContractProvider, address: Address, role_id: bigint) {
      let builder = new TupleBuilder();
      builder.writeAddress(address);
      builder.writeNumber(role_id);
      let source = (await provider.get('has_role', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
  async getRoleAdmin(provider: ContractProvider, role_id: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(role_id);
      let source = (await provider.get('role_admin', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getValidatorRoleId(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('validator_role_id', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getGetForeignStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(from_token);
      builder.writeNumber(to_token);
      let source = (await provider.get('get_foreign_strategies', builder.build())).stack;
      const result = loadGetterTupleSteps(source);
      return result;
  }
  
  async getGetIncomingStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(from_token);
      builder.writeNumber(to_token);
      let source = (await provider.get('get_incoming_strategies', builder.build())).stack;
      const result = loadGetterTupleSteps(source);
      return result;
  }
  
  async getGetLocalStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(from_token);
      builder.writeNumber(to_token);
      let source = (await provider.get('get_local_strategies', builder.build())).stack;
      const result = loadGetterTupleSteps(source);
      return result;
  }
  
  async getGetStrategies(provider: ContractProvider, chain_id: bigint, from_token: bigint, to_token: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(chain_id);
      builder.writeNumber(from_token);
      builder.writeNumber(to_token);
      let source = (await provider.get('get_strategies', builder.build())).stack;
      const result = loadGetterTupleStrategies(source);
      return result;
  }
  
}