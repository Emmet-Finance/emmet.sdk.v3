//@ts-nocheck generated code cope
import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
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
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

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
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
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
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

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
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type JettonData = {
  $$type: "JettonData";
  total_supply: bigint;
  mintable: boolean;
  admin_address: Address;
  jetton_content: Cell;
  jetton_wallet_code: Cell;
};

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.total_supply);
    b_0.storeBit(src.mintable);
    b_0.storeAddress(src.admin_address);
    b_0.storeRef(src.jetton_content);
    b_0.storeRef(src.jetton_wallet_code);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _total_supply = sc_0.loadCoins();
  let _mintable = sc_0.loadBit();
  let _admin_address = sc_0.loadAddress();
  let _jetton_content = sc_0.loadRef();
  let _jetton_wallet_code = sc_0.loadRef();
  return {
    $$type: "JettonData" as const,
    total_supply: _total_supply,
    mintable: _mintable,
    admin_address: _admin_address,
    jetton_content: _jetton_content,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function loadTupleJettonData(source: TupleReader) {
  let _total_supply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _admin_address = source.readAddress();
  let _jetton_content = source.readCell();
  let _jetton_wallet_code = source.readCell();
  return {
    $$type: "JettonData" as const,
    total_supply: _total_supply,
    mintable: _mintable,
    admin_address: _admin_address,
    jetton_content: _jetton_content,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.total_supply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.admin_address);
  builder.writeCell(source.jetton_content);
  builder.writeCell(source.jetton_wallet_code);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
    },
    parse: (src) => {
      return loadJettonData(src.loadRef().beginParse());
    },
  };
}

export type JettonMint = {
  $$type: "JettonMint";
  origin: Address;
  receiver: Address;
  amount: bigint;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonMint(src: JettonMint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2310479113, 32);
    b_0.storeAddress(src.origin);
    b_0.storeAddress(src.receiver);
    b_0.storeInt(src.amount, 257);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2310479113) {
    throw Error("Invalid prefix");
  }
  let _origin = sc_0.loadAddress();
  let _receiver = sc_0.loadAddress();
  let _amount = sc_0.loadIntBig(257);
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonMint" as const,
    origin: _origin,
    receiver: _receiver,
    amount: _amount,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonMint(source: TupleReader) {
  let _origin = source.readAddress();
  let _receiver = source.readAddress();
  let _amount = source.readBigNumber();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonMint" as const,
    origin: _origin,
    receiver: _receiver,
    amount: _amount,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonMint(source: JettonMint) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.origin);
  builder.writeAddress(source.receiver);
  builder.writeNumber(source.amount);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
    },
    parse: (src) => {
      return loadJettonMint(src.loadRef().beginParse());
    },
  };
}

export type JettonTransfer = {
  $$type: "JettonTransfer";
  query_id: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadJettonTransfer(src.loadRef().beginParse());
    },
  };
}

export type JettonTransferNotification = {
  $$type: "JettonTransferNotification";
  query_id: bigint;
  amount: bigint;
  sender: Address;
  forward_payload: Cell;
};

export function storeJettonTransferNotification(
  src: JettonTransferNotification
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1935855772, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.sender);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonTransferNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonTransferNotification" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonTransferNotification" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonTransferNotification(
  source: JettonTransferNotification
) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonTransferNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonTransferNotification(src.loadRef().beginParse());
    },
  };
}

export type JettonBurn = {
  $$type: "JettonBurn";
  query_id: bigint;
  amount: bigint;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonBurn(src: JettonBurn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1499400124, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonBurn" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonBurn(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonBurn" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonBurn(source: JettonBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
    },
    parse: (src) => {
      return loadJettonBurn(src.loadRef().beginParse());
    },
  };
}

export type JettonExcesses = {
  $$type: "JettonExcesses";
  query_id: bigint;
};

export function storeJettonExcesses(src: JettonExcesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadJettonExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "JettonExcesses" as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "JettonExcesses" as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadJettonExcesses(src.loadRef().beginParse());
    },
  };
}

export type JettonInternalTransfer = {
  $$type: "JettonInternalTransfer";
  query_id: bigint;
  amount: bigint;
  from: Address;
  response_address: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(395134233, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.response_address);
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonInternalTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_address = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonInternalTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_address: _response_address,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_address = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonInternalTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_address: _response_address,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_address);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonInternalTransfer(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonInternalTransfer(src.loadRef().beginParse());
    },
  };
}

export type JettonBurnNotification = {
  $$type: "JettonBurnNotification";
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

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
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "JettonBurnNotification" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _response_destination = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "JettonBurnNotification" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonBurnNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonBurnNotification(src.loadRef().beginParse());
    },
  };
}

export type WalletData = {
  $$type: "WalletData";
  balance: bigint;
  owner: Address;
  jetton: Address;
  jetton_wallet_code: Cell;
};

export function storeWalletData(src: WalletData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.balance);
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.jetton);
    b_0.storeRef(src.jetton_wallet_code);
  };
}

export function loadWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _jetton = sc_0.loadAddress();
  let _jetton_wallet_code = sc_0.loadRef();
  return {
    $$type: "WalletData" as const,
    balance: _balance,
    owner: _owner,
    jetton: _jetton,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function loadTupleWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _jetton = source.readAddress();
  let _jetton_wallet_code = source.readCell();
  return {
    $$type: "WalletData" as const,
    balance: _balance,
    owner: _owner,
    jetton: _jetton,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function storeTupleWalletData(source: WalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.jetton);
  builder.writeCell(source.jetton_wallet_code);
  return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
    },
    parse: (src) => {
      return loadWalletData(src.loadRef().beginParse());
    },
  };
}

export type GrantRole = {
  $$type: "GrantRole";
  to: Address;
  role_id: bigint;
};

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
  if (sc_0.loadUint(32) !== 174185305) {
    throw Error("Invalid prefix");
  }
  let _to = sc_0.loadAddress();
  let _role_id = sc_0.loadIntBig(257);
  return { $$type: "GrantRole" as const, to: _to, role_id: _role_id };
}

function loadTupleGrantRole(source: TupleReader) {
  let _to = source.readAddress();
  let _role_id = source.readBigNumber();
  return { $$type: "GrantRole" as const, to: _to, role_id: _role_id };
}

function storeTupleGrantRole(source: GrantRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.role_id);
  return builder.build();
}

function dictValueParserGrantRole(): DictionaryValue<GrantRole> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGrantRole(src)).endCell());
    },
    parse: (src) => {
      return loadGrantRole(src.loadRef().beginParse());
    },
  };
}

export type RevokeRole = {
  $$type: "RevokeRole";
  to: Address;
  role_id: bigint;
};

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
  if (sc_0.loadUint(32) !== 1363080030) {
    throw Error("Invalid prefix");
  }
  let _to = sc_0.loadAddress();
  let _role_id = sc_0.loadIntBig(257);
  return { $$type: "RevokeRole" as const, to: _to, role_id: _role_id };
}

function loadTupleRevokeRole(source: TupleReader) {
  let _to = source.readAddress();
  let _role_id = source.readBigNumber();
  return { $$type: "RevokeRole" as const, to: _to, role_id: _role_id };
}

function storeTupleRevokeRole(source: RevokeRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.role_id);
  return builder.build();
}

function dictValueParserRevokeRole(): DictionaryValue<RevokeRole> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRevokeRole(src)).endCell());
    },
    parse: (src) => {
      return loadRevokeRole(src.loadRef().beginParse());
    },
  };
}

export type RenounceRole = {
  $$type: "RenounceRole";
  role_id: bigint;
  address: Address;
};

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
  if (sc_0.loadUint(32) !== 389201441) {
    throw Error("Invalid prefix");
  }
  let _role_id = sc_0.loadIntBig(257);
  let _address = sc_0.loadAddress();
  return {
    $$type: "RenounceRole" as const,
    role_id: _role_id,
    address: _address,
  };
}

function loadTupleRenounceRole(source: TupleReader) {
  let _role_id = source.readBigNumber();
  let _address = source.readAddress();
  return {
    $$type: "RenounceRole" as const,
    role_id: _role_id,
    address: _address,
  };
}

function storeTupleRenounceRole(source: RenounceRole) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.role_id);
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserRenounceRole(): DictionaryValue<RenounceRole> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRenounceRole(src)).endCell());
    },
    parse: (src) => {
      return loadRenounceRole(src.loadRef().beginParse());
    },
  };
}

export type UpdateRoleAdmin = {
  $$type: "UpdateRoleAdmin";
  role_id: bigint;
  role_admin: bigint;
};

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
  if (sc_0.loadUint(32) !== 620382153) {
    throw Error("Invalid prefix");
  }
  let _role_id = sc_0.loadIntBig(257);
  let _role_admin = sc_0.loadIntBig(257);
  return {
    $$type: "UpdateRoleAdmin" as const,
    role_id: _role_id,
    role_admin: _role_admin,
  };
}

function loadTupleUpdateRoleAdmin(source: TupleReader) {
  let _role_id = source.readBigNumber();
  let _role_admin = source.readBigNumber();
  return {
    $$type: "UpdateRoleAdmin" as const,
    role_id: _role_id,
    role_admin: _role_admin,
  };
}

function storeTupleUpdateRoleAdmin(source: UpdateRoleAdmin) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.role_id);
  builder.writeNumber(source.role_admin);
  return builder.build();
}

function dictValueParserUpdateRoleAdmin(): DictionaryValue<UpdateRoleAdmin> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateRoleAdmin(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateRoleAdmin(src.loadRef().beginParse());
    },
  };
}

export type RoleData = {
  $$type: "RoleData";
  roles: Dictionary<Address, boolean>;
  admin_role: bigint;
};

export function storeRoleData(src: RoleData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.roles,
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool()
    );
    b_0.storeInt(src.admin_role, 257);
  };
}

export function loadRoleData(slice: Slice) {
  let sc_0 = slice;
  let _roles = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.Bool(),
    sc_0
  );
  let _admin_role = sc_0.loadIntBig(257);
  return {
    $$type: "RoleData" as const,
    roles: _roles,
    admin_role: _admin_role,
  };
}

function loadTupleRoleData(source: TupleReader) {
  let _roles = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.Bool(),
    source.readCellOpt()
  );
  let _admin_role = source.readBigNumber();
  return {
    $$type: "RoleData" as const,
    roles: _roles,
    admin_role: _admin_role,
  };
}

function storeTupleRoleData(source: RoleData) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.roles.size > 0
      ? beginCell()
          .storeDictDirect(
            source.roles,
            Dictionary.Keys.Address(),
            Dictionary.Values.Bool()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.admin_role);
  return builder.build();
}

function dictValueParserRoleData(): DictionaryValue<RoleData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRoleData(src)).endCell());
    },
    parse: (src) => {
      return loadRoleData(src.loadRef().beginParse());
    },
  };
}

export type WithdrawTokens = {
  $$type: "WithdrawTokens";
  amount: bigint;
};

export function storeWithdrawTokens(src: WithdrawTokens) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1814330430, 32);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadWithdrawTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1814330430) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: "WithdrawTokens" as const, amount: _amount };
}

function loadTupleWithdrawTokens(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: "WithdrawTokens" as const, amount: _amount };
}

function storeTupleWithdrawTokens(source: WithdrawTokens) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdrawTokens(): DictionaryValue<WithdrawTokens> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWithdrawTokens(src)).endCell());
    },
    parse: (src) => {
      return loadWithdrawTokens(src.loadRef().beginParse());
    },
  };
}

export type InternalWithdrawTokens = {
  $$type: "InternalWithdrawTokens";
  amount: bigint;
  to: Address;
};

export function storeInternalWithdrawTokens(src: InternalWithdrawTokens) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1802327053, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.to);
  };
}

export function loadInternalWithdrawTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1802327053) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  let _to = sc_0.loadAddress();
  return {
    $$type: "InternalWithdrawTokens" as const,
    amount: _amount,
    to: _to,
  };
}

function loadTupleInternalWithdrawTokens(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _to = source.readAddress();
  return {
    $$type: "InternalWithdrawTokens" as const,
    amount: _amount,
    to: _to,
  };
}

function storeTupleInternalWithdrawTokens(source: InternalWithdrawTokens) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.to);
  return builder.build();
}

function dictValueParserInternalWithdrawTokens(): DictionaryValue<InternalWithdrawTokens> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeInternalWithdrawTokens(src)).endCell()
      );
    },
    parse: (src) => {
      return loadInternalWithdrawTokens(src.loadRef().beginParse());
    },
  };
}

export type SetPosition = {
  $$type: "SetPosition";
  lastInternalFeeGrowth: bigint;
  amount: bigint;
};

export function storeSetPosition(src: SetPosition) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1040993470, 32);
    b_0.storeInt(src.lastInternalFeeGrowth, 257);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadSetPosition(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1040993470) {
    throw Error("Invalid prefix");
  }
  let _lastInternalFeeGrowth = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  return {
    $$type: "SetPosition" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    amount: _amount,
  };
}

function loadTupleSetPosition(source: TupleReader) {
  let _lastInternalFeeGrowth = source.readBigNumber();
  let _amount = source.readBigNumber();
  return {
    $$type: "SetPosition" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    amount: _amount,
  };
}

function storeTupleSetPosition(source: SetPosition) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.lastInternalFeeGrowth);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserSetPosition(): DictionaryValue<SetPosition> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetPosition(src)).endCell());
    },
    parse: (src) => {
      return loadSetPosition(src.loadRef().beginParse());
    },
  };
}

export type Withdraw = {
  $$type: "Withdraw";
  lastInternalFeeGrowth: bigint;
  amount: bigint;
  address: Address;
};

export function storeWithdraw(src: Withdraw) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3195667983, 32);
    b_0.storeInt(src.lastInternalFeeGrowth, 257);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.address);
  };
}

export function loadWithdraw(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3195667983) {
    throw Error("Invalid prefix");
  }
  let _lastInternalFeeGrowth = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  let _address = sc_0.loadAddress();
  return {
    $$type: "Withdraw" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    amount: _amount,
    address: _address,
  };
}

function loadTupleWithdraw(source: TupleReader) {
  let _lastInternalFeeGrowth = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _address = source.readAddress();
  return {
    $$type: "Withdraw" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    amount: _amount,
    address: _address,
  };
}

function storeTupleWithdraw(source: Withdraw) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.lastInternalFeeGrowth);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
    },
    parse: (src) => {
      return loadWithdraw(src.loadRef().beginParse());
    },
  };
}

export type ReleaseTokens = {
  $$type: "ReleaseTokens";
  to: Address;
  amount: bigint;
};

export function storeReleaseTokens(src: ReleaseTokens) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(456227478, 32);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadReleaseTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 456227478) {
    throw Error("Invalid prefix");
  }
  let _to = sc_0.loadAddress();
  let _amount = sc_0.loadIntBig(257);
  return { $$type: "ReleaseTokens" as const, to: _to, amount: _amount };
}

function loadTupleReleaseTokens(source: TupleReader) {
  let _to = source.readAddress();
  let _amount = source.readBigNumber();
  return { $$type: "ReleaseTokens" as const, to: _to, amount: _amount };
}

function storeTupleReleaseTokens(source: ReleaseTokens) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserReleaseTokens(): DictionaryValue<ReleaseTokens> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReleaseTokens(src)).endCell());
    },
    parse: (src) => {
      return loadReleaseTokens(src.loadRef().beginParse());
    },
  };
}

export type Staked = {
  $$type: "Staked";
  amount: bigint;
  staker: Address;
};

export function storeStaked(src: Staked) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(923309543, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.staker);
  };
}

export function loadStaked(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 923309543) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  let _staker = sc_0.loadAddress();
  return { $$type: "Staked" as const, amount: _amount, staker: _staker };
}

function loadTupleStaked(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _staker = source.readAddress();
  return { $$type: "Staked" as const, amount: _amount, staker: _staker };
}

function storeTupleStaked(source: Staked) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.staker);
  return builder.build();
}

function dictValueParserStaked(): DictionaryValue<Staked> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStaked(src)).endCell());
    },
    parse: (src) => {
      return loadStaked(src.loadRef().beginParse());
    },
  };
}

export type SetWalletAddress = {
  $$type: "SetWalletAddress";
  token_wallet: Address;
};

export function storeSetWalletAddress(src: SetWalletAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(907419751, 32);
    b_0.storeAddress(src.token_wallet);
  };
}

export function loadSetWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 907419751) {
    throw Error("Invalid prefix");
  }
  let _token_wallet = sc_0.loadAddress();
  return { $$type: "SetWalletAddress" as const, token_wallet: _token_wallet };
}

function loadTupleSetWalletAddress(source: TupleReader) {
  let _token_wallet = source.readAddress();
  return { $$type: "SetWalletAddress" as const, token_wallet: _token_wallet };
}

function storeTupleSetWalletAddress(source: SetWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.token_wallet);
  return builder.build();
}

function dictValueParserSetWalletAddress(): DictionaryValue<SetWalletAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetWalletAddress(src)).endCell());
    },
    parse: (src) => {
      return loadSetWalletAddress(src.loadRef().beginParse());
    },
  };
}

export type PoolPayload = {
  $$type: "PoolPayload";
  mode: bigint;
};

export function storePoolPayload(src: PoolPayload) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.mode, 257);
  };
}

export function loadPoolPayload(slice: Slice) {
  let sc_0 = slice;
  let _mode = sc_0.loadIntBig(257);
  return { $$type: "PoolPayload" as const, mode: _mode };
}

function loadTuplePoolPayload(source: TupleReader) {
  let _mode = source.readBigNumber();
  return { $$type: "PoolPayload" as const, mode: _mode };
}

function storeTuplePoolPayload(source: PoolPayload) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  return builder.build();
}

function dictValueParserPoolPayload(): DictionaryValue<PoolPayload> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePoolPayload(src)).endCell());
    },
    parse: (src) => {
      return loadPoolPayload(src.loadRef().beginParse());
    },
  };
}

export type Position = {
  $$type: "Position";
  lastInternalFeeGrowth: bigint;
  rewards: bigint;
};

export function storePosition(src: Position) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.lastInternalFeeGrowth, 257);
    b_0.storeInt(src.rewards, 257);
  };
}

export function loadPosition(slice: Slice) {
  let sc_0 = slice;
  let _lastInternalFeeGrowth = sc_0.loadIntBig(257);
  let _rewards = sc_0.loadIntBig(257);
  return {
    $$type: "Position" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    rewards: _rewards,
  };
}

function loadTuplePosition(source: TupleReader) {
  let _lastInternalFeeGrowth = source.readBigNumber();
  let _rewards = source.readBigNumber();
  return {
    $$type: "Position" as const,
    lastInternalFeeGrowth: _lastInternalFeeGrowth,
    rewards: _rewards,
  };
}

function storeTuplePosition(source: Position) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.lastInternalFeeGrowth);
  builder.writeNumber(source.rewards);
  return builder.build();
}

function dictValueParserPosition(): DictionaryValue<Position> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePosition(src)).endCell());
    },
    parse: (src) => {
      return loadPosition(src.loadRef().beginParse());
    },
  };
}

export type RewardSplit = {
  $$type: "RewardSplit";
  protocolFeeShare: bigint;
  lpProvidersShare: bigint;
};

export function storeRewardSplit(src: RewardSplit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.protocolFeeShare, 257);
    b_0.storeInt(src.lpProvidersShare, 257);
  };
}

export function loadRewardSplit(slice: Slice) {
  let sc_0 = slice;
  let _protocolFeeShare = sc_0.loadIntBig(257);
  let _lpProvidersShare = sc_0.loadIntBig(257);
  return {
    $$type: "RewardSplit" as const,
    protocolFeeShare: _protocolFeeShare,
    lpProvidersShare: _lpProvidersShare,
  };
}

function loadTupleRewardSplit(source: TupleReader) {
  let _protocolFeeShare = source.readBigNumber();
  let _lpProvidersShare = source.readBigNumber();
  return {
    $$type: "RewardSplit" as const,
    protocolFeeShare: _protocolFeeShare,
    lpProvidersShare: _lpProvidersShare,
  };
}

function storeTupleRewardSplit(source: RewardSplit) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.protocolFeeShare);
  builder.writeNumber(source.lpProvidersShare);
  return builder.build();
}

function dictValueParserRewardSplit(): DictionaryValue<RewardSplit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRewardSplit(src)).endCell());
    },
    parse: (src) => {
      return loadRewardSplit(src.loadRef().beginParse());
    },
  };
}

type EmmetLPWallet_init_args = {
  $$type: "EmmetLPWallet_init_args";
  owner: Address;
  jetton_master: Address;
};

function initEmmetLPWallet_init_args(src: EmmetLPWallet_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.jetton_master);
  };
}

async function EmmetLPWallet_init(owner: Address, jetton_master: Address) {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initEmmetLPWallet_init_args({
    $$type: "EmmetLPWallet_init_args",
    owner,
    jetton_master,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const EmmetLPWallet_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
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
  1237: { message: `APY: rewards == 0` },
  2296: {
    message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
  },
  2927: { message: `AccessControl: Role ID doesn't exist` },
  4429: { message: `Invalid sender` },
  7947: { message: `AccessControl: BadConfirmation` },
  9739: { message: `Sender is not a Jetton wallet` },
  13105: { message: `JettonWallet: Not enough jettons to transfer` },
  14033: { message: `APY: totalSupply == 0` },
  21733: { message: `AccessControl: Role doesn't exist` },
  27831: { message: `Only owner can call this function` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  30061: { message: `JettonMaster: Jetton is not mintable` },
  33244: { message: `Wallet already set` },
  37185: { message: `Not enough funds to transfer` },
  40171: { message: `No rewards to withdraw. Try later.` },
  42222: { message: `Only Allowed Wallet Can Send Notification` },
  43365: { message: `JettonMaster: Sender is not a Jetton owner` },
  46518: {
    message: `APY: totalSupply and rewards are not on the same decimal scale`,
  },
  47048: { message: `JettonWallet: Only owner can burn tokens` },
  50413: { message: `AccessControl: Doesnt have the role` },
  53624: { message: `You do not own this deposit.` },
  54023: { message: `AccessControl: Doesn't have role` },
  54444: { message: `Insufficient LP tokens to withdraw. Reduce the amount.` },
  60354: { message: `JettonWallet: Not enough balance to burn tokens` },
};

const EmmetLPWallet_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "JettonData",
    header: null,
    fields: [
      {
        name: "total_supply",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "mintable",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "admin_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "jetton_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "jetton_wallet_code",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "JettonMint",
    header: 2310479113,
    fields: [
      {
        name: "origin",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "receiver",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonTransfer",
    header: 260734629,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonTransferNotification",
    header: 1935855772,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonBurn",
    header: 1499400124,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonExcesses",
    header: 3576854235,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "JettonInternalTransfer",
    header: 395134233,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "from",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonBurnNotification",
    header: 2078119902,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "WalletData",
    header: null,
    fields: [
      {
        name: "balance",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "jetton",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "jetton_wallet_code",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "GrantRole",
    header: 174185305,
    fields: [
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RevokeRole",
    header: 1363080030,
    fields: [
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RenounceRole",
    header: 389201441,
    fields: [
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateRoleAdmin",
    header: 620382153,
    fields: [
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "role_admin",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RoleData",
    header: null,
    fields: [
      { name: "roles", type: { kind: "dict", key: "address", value: "bool" } },
      {
        name: "admin_role",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "WithdrawTokens",
    header: 1814330430,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "InternalWithdrawTokens",
    header: 1802327053,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "SetPosition",
    header: 1040993470,
    fields: [
      {
        name: "lastInternalFeeGrowth",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Withdraw",
    header: 3195667983,
    fields: [
      {
        name: "lastInternalFeeGrowth",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ReleaseTokens",
    header: 456227478,
    fields: [
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Staked",
    header: 923309543,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "staker",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "SetWalletAddress",
    header: 907419751,
    fields: [
      {
        name: "token_wallet",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "PoolPayload",
    header: null,
    fields: [
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Position",
    header: null,
    fields: [
      {
        name: "lastInternalFeeGrowth",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "rewards",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RewardSplit",
    header: null,
    fields: [
      {
        name: "protocolFeeShare",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "lpProvidersShare",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
];

const EmmetLPWallet_getters: ABIGetter[] = [
  {
    name: "get_wallet_data",
    arguments: [],
    returnType: { kind: "simple", type: "WalletData", optional: false },
  },
];

const EmmetLPWallet_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "JettonTransfer" } },
  { receiver: "internal", message: { kind: "typed", type: "JettonBurn" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "JettonInternalTransfer" },
  },
];

export class EmmetLPWallet implements Contract {
  static async init(owner: Address, jetton_master: Address) {
    return await EmmetLPWallet_init(owner, jetton_master);
  }

  static async fromInit(owner: Address, jetton_master: Address) {
    const init = await EmmetLPWallet_init(owner, jetton_master);
    const address = contractAddress(0, init);
    return new EmmetLPWallet(address, init);
  }

  static fromAddress(address: Address) {
    return new EmmetLPWallet(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: EmmetLPWallet_types,
    getters: EmmetLPWallet_getters,
    receivers: EmmetLPWallet_receivers,
    errors: EmmetLPWallet_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: JettonTransfer | JettonBurn | JettonInternalTransfer
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonTransfer"
    ) {
      body = beginCell().store(storeJettonTransfer(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonBurn"
    ) {
      body = beginCell().store(storeJettonBurn(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonInternalTransfer"
    ) {
      body = beginCell().store(storeJettonInternalTransfer(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetWalletData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("get_wallet_data", builder.build())).stack;
    const result = loadTupleWalletData(source);
    return result;
  }
}
