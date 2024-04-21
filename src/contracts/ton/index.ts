//@ts-nocheck
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(
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
    serialize: (src, buidler) => {
      buidler.storeRef(
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWalletData(src)).endCell());
    },
    parse: (src) => {
      return loadWalletData(src.loadRef().beginParse());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
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
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonMint(src)).endCell());
    },
    parse: (src) => {
      return loadJettonMint(src.loadRef().beginParse());
    },
  };
}

export type UpdateAdmin = {
  $$type: "UpdateAdmin";
  new_admin: Address;
};

export function storeUpdateAdmin(src: UpdateAdmin) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(367316568, 32);
    b_0.storeAddress(src.new_admin);
  };
}

export function loadUpdateAdmin(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 367316568) {
    throw Error("Invalid prefix");
  }
  let _new_admin = sc_0.loadAddress();
  return { $$type: "UpdateAdmin" as const, new_admin: _new_admin };
}

function loadTupleUpdateAdmin(source: TupleReader) {
  let _new_admin = source.readAddress();
  return { $$type: "UpdateAdmin" as const, new_admin: _new_admin };
}

function storeTupleUpdateAdmin(source: UpdateAdmin) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_admin);
  return builder.build();
}

function dictValueParserUpdateAdmin(): DictionaryValue<UpdateAdmin> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateAdmin(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateAdmin(src.loadRef().beginParse());
    },
  };
}

export type UpdateOwner = {
  $$type: "UpdateOwner";
  new_owner: Address;
};

export function storeUpdateOwner(src: UpdateOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(559076492, 32);
    b_0.storeAddress(src.new_owner);
  };
}

export function loadUpdateOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 559076492) {
    throw Error("Invalid prefix");
  }
  let _new_owner = sc_0.loadAddress();
  return { $$type: "UpdateOwner" as const, new_owner: _new_owner };
}

function loadTupleUpdateOwner(source: TupleReader) {
  let _new_owner = source.readAddress();
  return { $$type: "UpdateOwner" as const, new_owner: _new_owner };
}

function storeTupleUpdateOwner(source: UpdateOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_owner);
  return builder.build();
}

function dictValueParserUpdateOwner(): DictionaryValue<UpdateOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateOwner(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateOwner(src.loadRef().beginParse());
    },
  };
}

export type UpdateBridgeAdmin = {
  $$type: "UpdateBridgeAdmin";
  new_admin: Address;
};

export function storeUpdateBridgeAdmin(src: UpdateBridgeAdmin) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3847367118, 32);
    b_0.storeAddress(src.new_admin);
  };
}

export function loadUpdateBridgeAdmin(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3847367118) {
    throw Error("Invalid prefix");
  }
  let _new_admin = sc_0.loadAddress();
  return { $$type: "UpdateBridgeAdmin" as const, new_admin: _new_admin };
}

function loadTupleUpdateBridgeAdmin(source: TupleReader) {
  let _new_admin = source.readAddress();
  return { $$type: "UpdateBridgeAdmin" as const, new_admin: _new_admin };
}

function storeTupleUpdateBridgeAdmin(source: UpdateBridgeAdmin) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_admin);
  return builder.build();
}

function dictValueParserUpdateBridgeAdmin(): DictionaryValue<UpdateBridgeAdmin> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateBridgeAdmin(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateBridgeAdmin(src.loadRef().beginParse());
    },
  };
}

export type RevokeBridgeValidatorRole = {
  $$type: "RevokeBridgeValidatorRole";
  address_to_be_revoked: Address;
};

export function storeRevokeBridgeValidatorRole(src: RevokeBridgeValidatorRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1297781476, 32);
    b_0.storeAddress(src.address_to_be_revoked);
  };
}

export function loadRevokeBridgeValidatorRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1297781476) {
    throw Error("Invalid prefix");
  }
  let _address_to_be_revoked = sc_0.loadAddress();
  return {
    $$type: "RevokeBridgeValidatorRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function loadTupleRevokeBridgeValidatorRole(source: TupleReader) {
  let _address_to_be_revoked = source.readAddress();
  return {
    $$type: "RevokeBridgeValidatorRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function storeTupleRevokeBridgeValidatorRole(
  source: RevokeBridgeValidatorRole
) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address_to_be_revoked);
  return builder.build();
}

function dictValueParserRevokeBridgeValidatorRole(): DictionaryValue<RevokeBridgeValidatorRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeRevokeBridgeValidatorRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRevokeBridgeValidatorRole(src.loadRef().beginParse());
    },
  };
}

export type RevokeMappingAdminRole = {
  $$type: "RevokeMappingAdminRole";
  address_to_be_revoked: Address;
};

export function storeRevokeMappingAdminRole(src: RevokeMappingAdminRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(749574624, 32);
    b_0.storeAddress(src.address_to_be_revoked);
  };
}

export function loadRevokeMappingAdminRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 749574624) {
    throw Error("Invalid prefix");
  }
  let _address_to_be_revoked = sc_0.loadAddress();
  return {
    $$type: "RevokeMappingAdminRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function loadTupleRevokeMappingAdminRole(source: TupleReader) {
  let _address_to_be_revoked = source.readAddress();
  return {
    $$type: "RevokeMappingAdminRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function storeTupleRevokeMappingAdminRole(source: RevokeMappingAdminRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address_to_be_revoked);
  return builder.build();
}

function dictValueParserRevokeMappingAdminRole(): DictionaryValue<RevokeMappingAdminRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeRevokeMappingAdminRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRevokeMappingAdminRole(src.loadRef().beginParse());
    },
  };
}

export type RevokePauserRole = {
  $$type: "RevokePauserRole";
  address_to_be_revoked: Address;
};

export function storeRevokePauserRole(src: RevokePauserRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3801506133, 32);
    b_0.storeAddress(src.address_to_be_revoked);
  };
}

export function loadRevokePauserRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3801506133) {
    throw Error("Invalid prefix");
  }
  let _address_to_be_revoked = sc_0.loadAddress();
  return {
    $$type: "RevokePauserRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function loadTupleRevokePauserRole(source: TupleReader) {
  let _address_to_be_revoked = source.readAddress();
  return {
    $$type: "RevokePauserRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function storeTupleRevokePauserRole(source: RevokePauserRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address_to_be_revoked);
  return builder.build();
}

function dictValueParserRevokePauserRole(): DictionaryValue<RevokePauserRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeRevokePauserRole(src)).endCell());
    },
    parse: (src) => {
      return loadRevokePauserRole(src.loadRef().beginParse());
    },
  };
}

export type RevokeWithdrawerRole = {
  $$type: "RevokeWithdrawerRole";
  address_to_be_revoked: Address;
};

export function storeRevokeWithdrawerRole(src: RevokeWithdrawerRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3011775919, 32);
    b_0.storeAddress(src.address_to_be_revoked);
  };
}

export function loadRevokeWithdrawerRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3011775919) {
    throw Error("Invalid prefix");
  }
  let _address_to_be_revoked = sc_0.loadAddress();
  return {
    $$type: "RevokeWithdrawerRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function loadTupleRevokeWithdrawerRole(source: TupleReader) {
  let _address_to_be_revoked = source.readAddress();
  return {
    $$type: "RevokeWithdrawerRole" as const,
    address_to_be_revoked: _address_to_be_revoked,
  };
}

function storeTupleRevokeWithdrawerRole(source: RevokeWithdrawerRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address_to_be_revoked);
  return builder.build();
}

function dictValueParserRevokeWithdrawerRole(): DictionaryValue<RevokeWithdrawerRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeRevokeWithdrawerRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRevokeWithdrawerRole(src.loadRef().beginParse());
    },
  };
}

export type GrantBridgeValidatorRole = {
  $$type: "GrantBridgeValidatorRole";
  address: Address;
};

export function storeGrantBridgeValidatorRole(src: GrantBridgeValidatorRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1023274182, 32);
    b_0.storeAddress(src.address);
  };
}

export function loadGrantBridgeValidatorRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1023274182) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  return { $$type: "GrantBridgeValidatorRole" as const, address: _address };
}

function loadTupleGrantBridgeValidatorRole(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: "GrantBridgeValidatorRole" as const, address: _address };
}

function storeTupleGrantBridgeValidatorRole(source: GrantBridgeValidatorRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserGrantBridgeValidatorRole(): DictionaryValue<GrantBridgeValidatorRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeGrantBridgeValidatorRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadGrantBridgeValidatorRole(src.loadRef().beginParse());
    },
  };
}

export type GrantMappingAdminRole = {
  $$type: "GrantMappingAdminRole";
  address: Address;
};

export function storeGrantMappingAdminRole(src: GrantMappingAdminRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3374741213, 32);
    b_0.storeAddress(src.address);
  };
}

export function loadGrantMappingAdminRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3374741213) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  return { $$type: "GrantMappingAdminRole" as const, address: _address };
}

function loadTupleGrantMappingAdminRole(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: "GrantMappingAdminRole" as const, address: _address };
}

function storeTupleGrantMappingAdminRole(source: GrantMappingAdminRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserGrantMappingAdminRole(): DictionaryValue<GrantMappingAdminRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeGrantMappingAdminRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadGrantMappingAdminRole(src.loadRef().beginParse());
    },
  };
}

export type GrantPauserRole = {
  $$type: "GrantPauserRole";
  address: Address;
};

export function storeGrantPauserRole(src: GrantPauserRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(835048487, 32);
    b_0.storeAddress(src.address);
  };
}

export function loadGrantPauserRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 835048487) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  return { $$type: "GrantPauserRole" as const, address: _address };
}

function loadTupleGrantPauserRole(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: "GrantPauserRole" as const, address: _address };
}

function storeTupleGrantPauserRole(source: GrantPauserRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserGrantPauserRole(): DictionaryValue<GrantPauserRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeGrantPauserRole(src)).endCell());
    },
    parse: (src) => {
      return loadGrantPauserRole(src.loadRef().beginParse());
    },
  };
}

export type GrantWithdrawerRole = {
  $$type: "GrantWithdrawerRole";
  address: Address;
};

export function storeGrantWithdrawerRole(src: GrantWithdrawerRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1198756930, 32);
    b_0.storeAddress(src.address);
  };
}

export function loadGrantWithdrawerRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1198756930) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  return { $$type: "GrantWithdrawerRole" as const, address: _address };
}

function loadTupleGrantWithdrawerRole(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: "GrantWithdrawerRole" as const, address: _address };
}

function storeTupleGrantWithdrawerRole(source: GrantWithdrawerRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserGrantWithdrawerRole(): DictionaryValue<GrantWithdrawerRole> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeGrantWithdrawerRole(src)).endCell()
      );
    },
    parse: (src) => {
      return loadGrantWithdrawerRole(src.loadRef().beginParse());
    },
  };
}

export type TokenType = {
  $$type: "TokenType";
  is_native_coin: boolean;
  is_native_token: boolean;
  is_wrapped_token: boolean;
};

export function storeTokenType(src: TokenType) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_native_coin);
    b_0.storeBit(src.is_native_token);
    b_0.storeBit(src.is_wrapped_token);
  };
}

export function loadTokenType(slice: Slice) {
  let sc_0 = slice;
  let _is_native_coin = sc_0.loadBit();
  let _is_native_token = sc_0.loadBit();
  let _is_wrapped_token = sc_0.loadBit();
  return {
    $$type: "TokenType" as const,
    is_native_coin: _is_native_coin,
    is_native_token: _is_native_token,
    is_wrapped_token: _is_wrapped_token,
  };
}

function loadTupleTokenType(source: TupleReader) {
  let _is_native_coin = source.readBoolean();
  let _is_native_token = source.readBoolean();
  let _is_wrapped_token = source.readBoolean();
  return {
    $$type: "TokenType" as const,
    is_native_coin: _is_native_coin,
    is_native_token: _is_native_token,
    is_wrapped_token: _is_wrapped_token,
  };
}

function storeTupleTokenType(source: TokenType) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_native_coin);
  builder.writeBoolean(source.is_native_token);
  builder.writeBoolean(source.is_wrapped_token);
  return builder.build();
}

function dictValueParserTokenType(): DictionaryValue<TokenType> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenType(src)).endCell());
    },
    parse: (src) => {
      return loadTokenType(src.loadRef().beginParse());
    },
  };
}

export type SendInstallment = {
  $$type: "SendInstallment";
  amount: bigint;
  tx_id: bigint;
  native_chain_nonce: bigint;
  target_chain: bigint;
  token_id: bigint;
  destination_address: Cell;
};

export function storeSendInstallment(src: SendInstallment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3788443406, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeInt(src.tx_id, 257);
    b_0.storeInt(src.native_chain_nonce, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.target_chain, 257);
    b_1.storeInt(src.token_id, 257);
    b_1.storeRef(src.destination_address);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadSendInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3788443406) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  let _tx_id = sc_0.loadIntBig(257);
  let _native_chain_nonce = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _target_chain = sc_1.loadIntBig(257);
  let _token_id = sc_1.loadIntBig(257);
  let _destination_address = sc_1.loadRef();
  return {
    $$type: "SendInstallment" as const,
    amount: _amount,
    tx_id: _tx_id,
    native_chain_nonce: _native_chain_nonce,
    target_chain: _target_chain,
    token_id: _token_id,
    destination_address: _destination_address,
  };
}

function loadTupleSendInstallment(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _tx_id = source.readBigNumber();
  let _native_chain_nonce = source.readBigNumber();
  let _target_chain = source.readBigNumber();
  let _token_id = source.readBigNumber();
  let _destination_address = source.readCell();
  return {
    $$type: "SendInstallment" as const,
    amount: _amount,
    tx_id: _tx_id,
    native_chain_nonce: _native_chain_nonce,
    target_chain: _target_chain,
    token_id: _token_id,
    destination_address: _destination_address,
  };
}

function storeTupleSendInstallment(source: SendInstallment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeNumber(source.tx_id);
  builder.writeNumber(source.native_chain_nonce);
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.token_id);
  builder.writeCell(source.destination_address);
  return builder.build();
}

function dictValueParserSendInstallment(): DictionaryValue<SendInstallment> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendInstallment(src)).endCell());
    },
    parse: (src) => {
      return loadSendInstallment(src.loadRef().beginParse());
    },
  };
}

export type ReceivedInstallment = {
  $$type: "ReceivedInstallment";
  amount: bigint;
  tx_id: bigint;
  chain_nonce: bigint;
  native_chain_nonce: bigint;
  token_id: bigint;
  destination_address: Address;
};

export function storeReceivedInstallment(src: ReceivedInstallment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1727060366, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeInt(src.tx_id, 257);
    b_0.storeInt(src.chain_nonce, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.native_chain_nonce, 257);
    b_1.storeInt(src.token_id, 257);
    b_1.storeAddress(src.destination_address);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadReceivedInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1727060366) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  let _tx_id = sc_0.loadIntBig(257);
  let _chain_nonce = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _native_chain_nonce = sc_1.loadIntBig(257);
  let _token_id = sc_1.loadIntBig(257);
  let _destination_address = sc_1.loadAddress();
  return {
    $$type: "ReceivedInstallment" as const,
    amount: _amount,
    tx_id: _tx_id,
    chain_nonce: _chain_nonce,
    native_chain_nonce: _native_chain_nonce,
    token_id: _token_id,
    destination_address: _destination_address,
  };
}

function loadTupleReceivedInstallment(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _tx_id = source.readBigNumber();
  let _chain_nonce = source.readBigNumber();
  let _native_chain_nonce = source.readBigNumber();
  let _token_id = source.readBigNumber();
  let _destination_address = source.readAddress();
  return {
    $$type: "ReceivedInstallment" as const,
    amount: _amount,
    tx_id: _tx_id,
    chain_nonce: _chain_nonce,
    native_chain_nonce: _native_chain_nonce,
    token_id: _token_id,
    destination_address: _destination_address,
  };
}

function storeTupleReceivedInstallment(source: ReceivedInstallment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeNumber(source.tx_id);
  builder.writeNumber(source.chain_nonce);
  builder.writeNumber(source.native_chain_nonce);
  builder.writeNumber(source.token_id);
  builder.writeAddress(source.destination_address);
  return builder.build();
}

function dictValueParserReceivedInstallment(): DictionaryValue<ReceivedInstallment> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeReceivedInstallment(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReceivedInstallment(src.loadRef().beginParse());
    },
  };
}

export type FreezeTon = {
  $$type: "FreezeTon";
  target_chain: bigint;
  token_id: bigint;
  to: Cell;
  amount: bigint;
};

export function storeFreezeTon(src: FreezeTon) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1454467380, 32);
    b_0.storeInt(src.target_chain, 257);
    b_0.storeInt(src.token_id, 257);
    b_0.storeRef(src.to);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadFreezeTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1454467380) {
    throw Error("Invalid prefix");
  }
  let _target_chain = sc_0.loadIntBig(257);
  let _token_id = sc_0.loadIntBig(257);
  let _to = sc_0.loadRef();
  let _amount = sc_0.loadIntBig(257);
  return {
    $$type: "FreezeTon" as const,
    target_chain: _target_chain,
    token_id: _token_id,
    to: _to,
    amount: _amount,
  };
}

function loadTupleFreezeTon(source: TupleReader) {
  let _target_chain = source.readBigNumber();
  let _token_id = source.readBigNumber();
  let _to = source.readCell();
  let _amount = source.readBigNumber();
  return {
    $$type: "FreezeTon" as const,
    target_chain: _target_chain,
    token_id: _token_id,
    to: _to,
    amount: _amount,
  };
}

function storeTupleFreezeTon(source: FreezeTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.token_id);
  builder.writeCell(source.to);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserFreezeTon(): DictionaryValue<FreezeTon> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFreezeTon(src)).endCell());
    },
    parse: (src) => {
      return loadFreezeTon(src.loadRef().beginParse());
    },
  };
}

export type MapNativeContract = {
  $$type: "MapNativeContract";
  token_id: bigint;
  token_symbol: string;
  contract: Address;
  decimals: bigint;
};

export function storeMapNativeContract(src: MapNativeContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(184326790, 32);
    b_0.storeInt(src.token_id, 257);
    b_0.storeStringRefTail(src.token_symbol);
    b_0.storeAddress(src.contract);
    b_0.storeUint(src.decimals, 8);
  };
}

export function loadMapNativeContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 184326790) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadIntBig(257);
  let _token_symbol = sc_0.loadStringRefTail();
  let _contract = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  return {
    $$type: "MapNativeContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
  };
}

function loadTupleMapNativeContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  let _token_symbol = source.readString();
  let _contract = source.readAddress();
  let _decimals = source.readBigNumber();
  return {
    $$type: "MapNativeContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
  };
}

function storeTupleMapNativeContract(source: MapNativeContract) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  builder.writeString(source.token_symbol);
  builder.writeAddress(source.contract);
  builder.writeNumber(source.decimals);
  return builder.build();
}

function dictValueParserMapNativeContract(): DictionaryValue<MapNativeContract> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeMapNativeContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadMapNativeContract(src.loadRef().beginParse());
    },
  };
}

export type MapWrappedContract = {
  $$type: "MapWrappedContract";
  token_id: bigint;
  token_symbol: string;
  contract: Address;
  decimals: bigint;
};

export function storeMapWrappedContract(src: MapWrappedContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(989046332, 32);
    b_0.storeInt(src.token_id, 257);
    b_0.storeStringRefTail(src.token_symbol);
    b_0.storeAddress(src.contract);
    b_0.storeUint(src.decimals, 8);
  };
}

export function loadMapWrappedContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 989046332) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadIntBig(257);
  let _token_symbol = sc_0.loadStringRefTail();
  let _contract = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  return {
    $$type: "MapWrappedContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
  };
}

function loadTupleMapWrappedContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  let _token_symbol = source.readString();
  let _contract = source.readAddress();
  let _decimals = source.readBigNumber();
  return {
    $$type: "MapWrappedContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
  };
}

function storeTupleMapWrappedContract(source: MapWrappedContract) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  builder.writeString(source.token_symbol);
  builder.writeAddress(source.contract);
  builder.writeNumber(source.decimals);
  return builder.build();
}

function dictValueParserMapWrappedContract(): DictionaryValue<MapWrappedContract> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeMapWrappedContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadMapWrappedContract(src.loadRef().beginParse());
    },
  };
}

export type AddChain = {
  $$type: "AddChain";
  chain_id: bigint;
  chain_name: string;
};

export function storeAddChain(src: AddChain) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2751922069, 32);
    b_0.storeUint(src.chain_id, 16);
    b_0.storeStringRefTail(src.chain_name);
  };
}

export function loadAddChain(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2751922069) {
    throw Error("Invalid prefix");
  }
  let _chain_id = sc_0.loadUintBig(16);
  let _chain_name = sc_0.loadStringRefTail();
  return {
    $$type: "AddChain" as const,
    chain_id: _chain_id,
    chain_name: _chain_name,
  };
}

function loadTupleAddChain(source: TupleReader) {
  let _chain_id = source.readBigNumber();
  let _chain_name = source.readString();
  return {
    $$type: "AddChain" as const,
    chain_id: _chain_id,
    chain_name: _chain_name,
  };
}

function storeTupleAddChain(source: AddChain) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.chain_id);
  builder.writeString(source.chain_name);
  return builder.build();
}

function dictValueParserAddChain(): DictionaryValue<AddChain> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddChain(src)).endCell());
    },
    parse: (src) => {
      return loadAddChain(src.loadRef().beginParse());
    },
  };
}

export type UpdateChain = {
  $$type: "UpdateChain";
  chain_id: bigint;
  chain_name: string;
};

export function storeUpdateChain(src: UpdateChain) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1203306390, 32);
    b_0.storeUint(src.chain_id, 16);
    b_0.storeStringRefTail(src.chain_name);
  };
}

export function loadUpdateChain(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1203306390) {
    throw Error("Invalid prefix");
  }
  let _chain_id = sc_0.loadUintBig(16);
  let _chain_name = sc_0.loadStringRefTail();
  return {
    $$type: "UpdateChain" as const,
    chain_id: _chain_id,
    chain_name: _chain_name,
  };
}

function loadTupleUpdateChain(source: TupleReader) {
  let _chain_id = source.readBigNumber();
  let _chain_name = source.readString();
  return {
    $$type: "UpdateChain" as const,
    chain_id: _chain_id,
    chain_name: _chain_name,
  };
}

function storeTupleUpdateChain(source: UpdateChain) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.chain_id);
  builder.writeString(source.chain_name);
  return builder.build();
}

function dictValueParserUpdateChain(): DictionaryValue<UpdateChain> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateChain(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateChain(src.loadRef().beginParse());
    },
  };
}

export type ReceiveInstallment = {
  $$type: "ReceiveInstallment";
  tx_id: bigint;
  installment: InstallmentIn;
};

export function storeReceiveInstallment(src: ReceiveInstallment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(882722431, 32);
    b_0.storeInt(src.tx_id, 257);
    let b_1 = new Builder();
    b_1.store(storeInstallmentIn(src.installment));
    b_0.storeRef(b_1.endCell());
  };
}

export function loadReceiveInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 882722431) {
    throw Error("Invalid prefix");
  }
  let _tx_id = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _installment = loadInstallmentIn(sc_1);
  return {
    $$type: "ReceiveInstallment" as const,
    tx_id: _tx_id,
    installment: _installment,
  };
}

function loadTupleReceiveInstallment(source: TupleReader) {
  let _tx_id = source.readBigNumber();
  const _installment = loadTupleInstallmentIn(source.readTuple());
  return {
    $$type: "ReceiveInstallment" as const,
    tx_id: _tx_id,
    installment: _installment,
  };
}

function storeTupleReceiveInstallment(source: ReceiveInstallment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.tx_id);
  builder.writeTuple(storeTupleInstallmentIn(source.installment));
  return builder.build();
}

function dictValueParserReceiveInstallment(): DictionaryValue<ReceiveInstallment> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeReceiveInstallment(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReceiveInstallment(src.loadRef().beginParse());
    },
  };
}

export type SetChainFee = {
  $$type: "SetChainFee";
  chain_id: bigint;
  fee: bigint;
};

export function storeSetChainFee(src: SetChainFee) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2586505758, 32);
    b_0.storeUint(src.chain_id, 16);
    b_0.storeUint(src.fee, 256);
  };
}

export function loadSetChainFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2586505758) {
    throw Error("Invalid prefix");
  }
  let _chain_id = sc_0.loadUintBig(16);
  let _fee = sc_0.loadUintBig(256);
  return { $$type: "SetChainFee" as const, chain_id: _chain_id, fee: _fee };
}

function loadTupleSetChainFee(source: TupleReader) {
  let _chain_id = source.readBigNumber();
  let _fee = source.readBigNumber();
  return { $$type: "SetChainFee" as const, chain_id: _chain_id, fee: _fee };
}

function storeTupleSetChainFee(source: SetChainFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.chain_id);
  builder.writeNumber(source.fee);
  return builder.build();
}

function dictValueParserSetChainFee(): DictionaryValue<SetChainFee> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetChainFee(src)).endCell());
    },
    parse: (src) => {
      return loadSetChainFee(src.loadRef().beginParse());
    },
  };
}

export type InstallmentIn = {
  $$type: "InstallmentIn";
  amount: bigint;
  to: Address;
  chain_id: bigint;
  token_id: bigint;
};

export function storeInstallmentIn(src: InstallmentIn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.amount, 256);
    b_0.storeAddress(src.to);
    b_0.storeUint(src.chain_id, 16);
    b_0.storeUint(src.token_id, 256);
  };
}

export function loadInstallmentIn(slice: Slice) {
  let sc_0 = slice;
  let _amount = sc_0.loadUintBig(256);
  let _to = sc_0.loadAddress();
  let _chain_id = sc_0.loadUintBig(16);
  let _token_id = sc_0.loadUintBig(256);
  return {
    $$type: "InstallmentIn" as const,
    amount: _amount,
    to: _to,
    chain_id: _chain_id,
    token_id: _token_id,
  };
}

function loadTupleInstallmentIn(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _to = source.readAddress();
  let _chain_id = source.readBigNumber();
  let _token_id = source.readBigNumber();
  return {
    $$type: "InstallmentIn" as const,
    amount: _amount,
    to: _to,
    chain_id: _chain_id,
    token_id: _token_id,
  };
}

function storeTupleInstallmentIn(source: InstallmentIn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.to);
  builder.writeNumber(source.chain_id);
  builder.writeNumber(source.token_id);
  return builder.build();
}

function dictValueParserInstallmentIn(): DictionaryValue<InstallmentIn> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeInstallmentIn(src)).endCell());
    },
    parse: (src) => {
      return loadInstallmentIn(src.loadRef().beginParse());
    },
  };
}

export type InstallmentOut = {
  $$type: "InstallmentOut";
  amount: bigint;
  to: string;
  target_chain: bigint;
  token_id: bigint;
};

export function storeInstallmentOut(src: InstallmentOut) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.amount, 256);
    b_0.storeStringRefTail(src.to);
    b_0.storeUint(src.target_chain, 16);
    b_0.storeInt(src.token_id, 257);
  };
}

export function loadInstallmentOut(slice: Slice) {
  let sc_0 = slice;
  let _amount = sc_0.loadUintBig(256);
  let _to = sc_0.loadStringRefTail();
  let _target_chain = sc_0.loadUintBig(16);
  let _token_id = sc_0.loadIntBig(257);
  return {
    $$type: "InstallmentOut" as const,
    amount: _amount,
    to: _to,
    target_chain: _target_chain,
    token_id: _token_id,
  };
}

function loadTupleInstallmentOut(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _to = source.readString();
  let _target_chain = source.readBigNumber();
  let _token_id = source.readBigNumber();
  return {
    $$type: "InstallmentOut" as const,
    amount: _amount,
    to: _to,
    target_chain: _target_chain,
    token_id: _token_id,
  };
}

function storeTupleInstallmentOut(source: InstallmentOut) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeString(source.to);
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.token_id);
  return builder.build();
}

function dictValueParserInstallmentOut(): DictionaryValue<InstallmentOut> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeInstallmentOut(src)).endCell());
    },
    parse: (src) => {
      return loadInstallmentOut(src.loadRef().beginParse());
    },
  };
}

export type Token = {
  $$type: "Token";
  address: Address;
  decimals: bigint;
};

export function storeToken(src: Token) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.address);
    b_0.storeUint(src.decimals, 8);
  };
}

export function loadToken(slice: Slice) {
  let sc_0 = slice;
  let _address = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  return { $$type: "Token" as const, address: _address, decimals: _decimals };
}

function loadTupleToken(source: TupleReader) {
  let _address = source.readAddress();
  let _decimals = source.readBigNumber();
  return { $$type: "Token" as const, address: _address, decimals: _decimals };
}

function storeTupleToken(source: Token) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeNumber(source.decimals);
  return builder.build();
}

function dictValueParserToken(): DictionaryValue<Token> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeToken(src)).endCell());
    },
    parse: (src) => {
      return loadToken(src.loadRef().beginParse());
    },
  };
}

export type ChainName = {
  $$type: "ChainName";
  name: string;
};

export function storeChainName(src: ChainName) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.name);
  };
}

export function loadChainName(slice: Slice) {
  let sc_0 = slice;
  let _name = sc_0.loadStringRefTail();
  return { $$type: "ChainName" as const, name: _name };
}

function loadTupleChainName(source: TupleReader) {
  let _name = source.readString();
  return { $$type: "ChainName" as const, name: _name };
}

function storeTupleChainName(source: ChainName) {
  let builder = new TupleBuilder();
  builder.writeString(source.name);
  return builder.build();
}

function dictValueParserChainName(): DictionaryValue<ChainName> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChainName(src)).endCell());
    },
    parse: (src) => {
      return loadChainName(src.loadRef().beginParse());
    },
  };
}

export type TokenSymbol = {
  $$type: "TokenSymbol";
  symbol: string;
};

export function storeTokenSymbol(src: TokenSymbol) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.symbol);
  };
}

export function loadTokenSymbol(slice: Slice) {
  let sc_0 = slice;
  let _symbol = sc_0.loadStringRefTail();
  return { $$type: "TokenSymbol" as const, symbol: _symbol };
}

function loadTupleTokenSymbol(source: TupleReader) {
  let _symbol = source.readString();
  return { $$type: "TokenSymbol" as const, symbol: _symbol };
}

function storeTupleTokenSymbol(source: TokenSymbol) {
  let builder = new TupleBuilder();
  builder.writeString(source.symbol);
  return builder.build();
}

function dictValueParserTokenSymbol(): DictionaryValue<TokenSymbol> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenSymbol(src)).endCell());
    },
    parse: (src) => {
      return loadTokenSymbol(src.loadRef().beginParse());
    },
  };
}

export type UpdateBaseUri = {
  $$type: "UpdateBaseUri";
  new_base_uri: string;
};

export function storeUpdateBaseUri(src: UpdateBaseUri) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3032156853, 32);
    b_0.storeStringRefTail(src.new_base_uri);
  };
}

export function loadUpdateBaseUri(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3032156853) {
    throw Error("Invalid prefix");
  }
  let _new_base_uri = sc_0.loadStringRefTail();
  return { $$type: "UpdateBaseUri" as const, new_base_uri: _new_base_uri };
}

function loadTupleUpdateBaseUri(source: TupleReader) {
  let _new_base_uri = source.readString();
  return { $$type: "UpdateBaseUri" as const, new_base_uri: _new_base_uri };
}

function storeTupleUpdateBaseUri(source: UpdateBaseUri) {
  let builder = new TupleBuilder();
  builder.writeString(source.new_base_uri);
  return builder.build();
}

function dictValueParserUpdateBaseUri(): DictionaryValue<UpdateBaseUri> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateBaseUri(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateBaseUri(src.loadRef().beginParse());
    },
  };
}

export type UpdateTransferFee = {
  $$type: "UpdateTransferFee";
  new_fee: bigint;
};

export function storeUpdateTransferFee(src: UpdateTransferFee) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1793030273, 32);
    b_0.storeInt(src.new_fee, 257);
  };
}

export function loadUpdateTransferFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1793030273) {
    throw Error("Invalid prefix");
  }
  let _new_fee = sc_0.loadIntBig(257);
  return { $$type: "UpdateTransferFee" as const, new_fee: _new_fee };
}

function loadTupleUpdateTransferFee(source: TupleReader) {
  let _new_fee = source.readBigNumber();
  return { $$type: "UpdateTransferFee" as const, new_fee: _new_fee };
}

function storeTupleUpdateTransferFee(source: UpdateTransferFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.new_fee);
  return builder.build();
}

function dictValueParserUpdateTransferFee(): DictionaryValue<UpdateTransferFee> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateTransferFee(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateTransferFee(src.loadRef().beginParse());
    },
  };
}

export type RemoveNativeMappedContract = {
  $$type: "RemoveNativeMappedContract";
  token_id: bigint;
};

export function storeRemoveNativeMappedContract(
  src: RemoveNativeMappedContract
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3180152699, 32);
    b_0.storeUint(src.token_id, 256);
  };
}

export function loadRemoveNativeMappedContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3180152699) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadUintBig(256);
  return { $$type: "RemoveNativeMappedContract" as const, token_id: _token_id };
}

function loadTupleRemoveNativeMappedContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  return { $$type: "RemoveNativeMappedContract" as const, token_id: _token_id };
}

function storeTupleRemoveNativeMappedContract(
  source: RemoveNativeMappedContract
) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  return builder.build();
}

function dictValueParserRemoveNativeMappedContract(): DictionaryValue<RemoveNativeMappedContract> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeRemoveNativeMappedContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRemoveNativeMappedContract(src.loadRef().beginParse());
    },
  };
}

export type RemoveWrappedMappedContract = {
  $$type: "RemoveWrappedMappedContract";
  token_id: bigint;
};

export function storeRemoveWrappedMappedContract(
  src: RemoveWrappedMappedContract
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3150919874, 32);
    b_0.storeUint(src.token_id, 256);
  };
}

export function loadRemoveWrappedMappedContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3150919874) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadUintBig(256);
  return {
    $$type: "RemoveWrappedMappedContract" as const,
    token_id: _token_id,
  };
}

function loadTupleRemoveWrappedMappedContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  return {
    $$type: "RemoveWrappedMappedContract" as const,
    token_id: _token_id,
  };
}

function storeTupleRemoveWrappedMappedContract(
  source: RemoveWrappedMappedContract
) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  return builder.build();
}

function dictValueParserRemoveWrappedMappedContract(): DictionaryValue<RemoveWrappedMappedContract> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeRemoveWrappedMappedContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRemoveWrappedMappedContract(src.loadRef().beginParse());
    },
  };
}

export type UpdateProtocolFee = {
  $$type: "UpdateProtocolFee";
  new_fee: bigint;
};

export function storeUpdateProtocolFee(src: UpdateProtocolFee) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(865129320, 32);
    b_0.storeInt(src.new_fee, 257);
  };
}

export function loadUpdateProtocolFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 865129320) {
    throw Error("Invalid prefix");
  }
  let _new_fee = sc_0.loadIntBig(257);
  return { $$type: "UpdateProtocolFee" as const, new_fee: _new_fee };
}

function loadTupleUpdateProtocolFee(source: TupleReader) {
  let _new_fee = source.readBigNumber();
  return { $$type: "UpdateProtocolFee" as const, new_fee: _new_fee };
}

function storeTupleUpdateProtocolFee(source: UpdateProtocolFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.new_fee);
  return builder.build();
}

function dictValueParserUpdateProtocolFee(): DictionaryValue<UpdateProtocolFee> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateProtocolFee(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateProtocolFee(src.loadRef().beginParse());
    },
  };
}

type Bridge_init_args = {
  $$type: "Bridge_init_args";
  chain_nonce: bigint;
  native_coin: bigint;
  burner: Address;
  base_uri: string;
  transfer_fee: bigint;
  protocol_fee: bigint;
};

function initBridge_init_args(src: Bridge_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.chain_nonce, 257);
    b_0.storeInt(src.native_coin, 257);
    b_0.storeAddress(src.burner);
    b_0.storeStringRefTail(src.base_uri);
    let b_1 = new Builder();
    b_1.storeInt(src.transfer_fee, 257);
    b_1.storeInt(src.protocol_fee, 257);
    b_0.storeRef(b_1.endCell());
  };
}

async function Bridge_init(
  chain_nonce: bigint,
  native_coin: bigint,
  burner: Address,
  base_uri: string,
  transfer_fee: bigint,
  protocol_fee: bigint
) {
  const __code = Cell.fromBase64(
    "te6ccgECyAEAMLEAART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggrkEBQIBIHd4BO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghBWsWk0ugYHCAkBQMj4QwHMfwHKABEXERYRFREUERMREhERERBV4Ns8ye1UEQHsMTIRFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGIEIRyXAAPL0ERfTDwoAstMfAYIQe92X3rry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAUVUVFEMwAfQ1XwOCAIpn+EFvJBAjXwMnxwXy9BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAQ4E/I6lMNMfAYIQVrFpNLry4IGBAQHXAIEBAdcA1IEBAdcAVTBsFNs8f+AgghAK/JqGuo7AMNMfAYIQCvyahrry4IGBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHVTBsFNs8f+AgghA686Y8uuMCIBMUFRYC7hEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMCERcCAREXAREYVhlWGNs8gQEBVFYAVhoBPwsB/EEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAI6ASvvL0ERakERjT/9QwERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCQwD/AgRGQgHERkHBhEZBgURGQUEERkEAxEZAwIRGQIBERkBERdWGNs8BBEYBAMRGwMCVhMCAREbAREaEEUQNEATyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBccDQAEVTsB/BEYgQhHJcAA8vQRF9MPgQEBVFcAUkBBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYboBK+8vQRF6QRF9QB0NP/MAHUMBEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8E0g8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREZVhpWGds8VhjbPDADERkDAhEaAlYWAlYTAgERGQERGhBFEDRAE8hVUNs8yT8XHBAAesiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOxMB7AERFgERF4EBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAd9AAb9AAZ9AAHyPQAFvQAFPQAAsj0APQAEvQAAsj0ABT0AFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFPQAFMoAUAUSAIog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIyFAHzxbJUAbMFoEBAc8AFoEBAc8AyVADzMkBzMlQA8zJAczJAcwC8hEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYgQhHJcAA8vQRFqQRFlYX2zwXGAHQERYRGhEWERURGREVERQRGBEUERMRFxETERIRGhESERERGRERERARGBEQDxEXDw4RGg4NERkNDBEYDAsRFwsKERoKCREZCQgRGAgHERcHBhEaBgURGQUEERgEAxEXAwIRGgIBERkBERgeAYAw0x8BghA686Y8uvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdVMGwU2zx/IATWghCkBv+Vuo6ZMNMfAYIQpAb/lbry4IHTD9QB0BJsEts8f+AgghC9jUd7uo6VMNMfAYIQvY1He7ry4IHT/wEx2zx/4CCCELvPOMK6jpUw0x8BghC7zzjCuvLggdP/ATHbPH/gIIIQR7j/lrojJCUmBEyCAOfEIVYVvZMhwwCRcOLy9MhvAAFvjG1vjFYU2zzbPIsS2Ns8AUhJSRkB+oEBAVRXAFYbAUEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAVhygJKASvvL0ERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKGwQW2zzbPIsS2Ns8VhdISUkaAjDbPNs8byIByZMhbrOWAW8iWczJ6DHQ+QJISQL8CREXCREXCAcGVUBWGYFDXvhBbyQTXwMivvL0ERRWFKABERUBERSgERQEERoEAxEZAwIRFwJWEgIBERwBERkQRRA0QBPIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREREWEREREBEVERAPERQPDhETDg0REg0MEREMHB0AWoIQ4c8PDlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwASzMkBzAAyCxEQCxCvEJ4QjRB8EGsQWhBJEDhHFUNjFAH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8fAOYOERIODRERDQwREAwQv1U6AoEBAQLIWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB8kCERMCVhMBIG6VMFn0WjCUQTP0FeKBAQECyAHIAc8WyQHMyQMREQMBERIBIG6VMFn0WjCUQTP0FeIOAdARFhEaERYRFREZERURFBEYERQRExEXERMREhEaERIREREZEREREBEYERAPERcPDhEaDg0RGQ0MERgMCxEXCwoRGgoJERkJCBEYCAcRFwcGERoGBREZBQQRGAQDERcDAhEaAgERGQERGCEB+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPIgDiDhESDg0REQ0MERAMEL9VOgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJAhERAlYRASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPwEREAEgbpUwWfRaMJRBM/QV4gwB0BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYJwGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUArAZoRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQC4E9I6ZMNMfAYIQR7j/lrry4IHTD9QB0BJsEts8f+AgghA0nUZ/uo7IMNMfAYIQNJ1Gf7ry4IGBAQHXANQB0NP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9P/VTA0EEVVAmwV2zx/4CCCEJoq8h664wIgMTIzNAH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8oARAOERAOVR3bPCkB1BEVERgRFREUERcRFBETERYRExESERgREhERERcREREQERYREA8RGA8OERcODREWDQwRGAwLERcLChEWCgkRGAkIERcIBxEWBwYRGAYFERcFBBEWBAMRGAMCERcCAREWAREYggDelhEYVhcqAf6BAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrOzAREZAfL0gQEBERnIAcgBzxbJAczJEDsCERkCAREXASBulTBZ9FowlEEz9BXiERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwLEHoQaRBYOQGmgXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IEBAW0sAfggbpIwbY4rIG7y0IBvIshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyeICERECVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4gMREAMSAREZASBulTBZ9FowlEEz9BXiLQB+ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDw4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAaaBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0gQEBbS8B/CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4hAvVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4hA+EgERGQEgbpUwWfRaMJRBM/QV4hEVERYRFTAAchEUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeDBCrEJoQiRB4EGcQVhBFEDRBMAHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERg1AeARFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERsMCxEaCwoRGQoJERgJCBEXCAcRGwcGERoGBREZBQQRGAQDERcDAhEbAgERGgERGYEIRyXAAPL0PQEwMNMfAYIQmiryHrry4IHTD9P/WWwS2zx/OgT+ghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIIIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG64wIgwAAi10nBIbCSW3/gIIIQlGqYtlpbXF0B+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPNgEQDhEQDlUd2zw3AdIRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIFk6BEYVhc4AfyBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBERkB8vSBAQERGcgByAHPFskBzMkQOwIRGQIBERcBIG6VMFn0WjCUQTP0FeIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnAsQehBpEFg5ABAQRxA2RQRAEwHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERg7AfiBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0gQEBIBBHEwIRGQIBERoBIW6VW1n0WjCYyAHPAEEz9ELiERQRFhEUERMRFRETPABiERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRkQ1EgGigU27gQEL+EFvJBAjXwMtWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMtWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9FYYPgKoggDD7YEBAVYUQBNZ9A1voZIwbd8gbpIwbY4t0NP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9P/VTBsFG8E4m7y9FYXVhvbPFYZP0AB9IF8oQLCABLy9BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAggCmwBEYgQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zQQTaIFYXuiCzjkFWEYEBASNZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuJus5Fw4iGzkiCzkXDikjJw4w0SIrOSIbORcOKSILORcOLjAALjAEJDREUAYAERGAHy9BEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgCEgQEBVhFAFFn0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zAv4wERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERhWG9s8ERYRGBEWERURFxEVERQRFhEURkcB2BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYVh1WGk4E/OMAj3ZWG1YYVhuBAQFWEQJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry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ERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUBgATAw0x8BghBq33iBuvLggYEBAdcAATHbPH9iBPS6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEOVSKc66jrEw0x8BghDlUinOuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCEE1akuS64wIgghAsrZngumVmZ2gB/oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ5fAAIxAfyBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0MhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM1hACgQvBCrEJoQiRB4EGcQVhBFEDRDAAGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUBjAf6BcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOZAACMgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zx1AewRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQ2ERURFhEVERQRFREUERMRFBETERIRExESaQFiMNMfAYIQTVqS5Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f2oE9o6xMNMfAYIQLK2Z4Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghDilmFVuo6xMNMfAYIQ4pZhVbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f+AgghCzhA2vuuMCIGtsbW4ASBERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGdVBAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GoEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHiwwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHixAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GIEBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHixQFiMNMfAYIQs4QNr7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8f28D/oIQPP3sxrqOsTDTHwGCEDz97Ma68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQySZ23bqOsTDTHwGCEMkmdt268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH/gIIIQMcXUJ7q/wHAB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BeBAQsBERhtcSFulVtZ9FkwmMgBzwBBM/RB4scD7o6xMNMfAYIQMcXUJ7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+6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ERcRFBEUERYRFBEUERURFAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GoEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHiwwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHixAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GIEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHixQEE2zzGAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwKCxCJEHgQZxBWEEUQNEEwAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqwkKEHgQZxBWEEUQNEEwAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaCAkQZxBWEEUQNEEwAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQXgQELAREYf3EhbpVbWfRZMJjIAc8AQTP0QeLHAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEw"
  );
  const __system = Cell.fromBase64(
    "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lAHXADCSW23ibrOOJoEBC/hBbyQQI18DKllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBWgFWFcIA8vT4QW8kECNfAwERFX9ZcG1tbds8cBEUf9sxAQQBYjDTHwGCELOEDa+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHbPH8AWwHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0F4EBCwERGG1xIW6VW1n0WTCYyAHPAEEz9EHiALwB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BiBAQsBERhtcSFulVtZ9FkwmMgBzwBBM/RB4gC+AfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQZgQELAREYbXEhbpVbWfRZMJjIAc8AQTP0QeIAwAFiMNMfAYIQTVqS5Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMds8fwBfAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQagQELAREYbXEhbpVbWfRZMJjIAc8AQTP0QeIAwgHsERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0NhEVERYRFREUERURFBETERQRExESERMREgBhAEgRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnVQQBMDDTHwGCEGrfeIG68uCBgQEB1wABMds8fwBjAZoRFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQABkAf6BcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAGUAAjIBmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAGcB/IFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQyERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzQBoACgQvBCrEJoQiRB4EGcQVhBFEDRDAAGaERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUAAagH+gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgBrAAIxATAw0x8BghCaKvIeuvLggdMP0/9ZbBLbPH8AbQHQERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERgAbgH4gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IEBASAQRxMCERkCAREaASFulVtZ9FowmMgBzwBBM/RC4hEUERYRFBETERUREwBvAGIREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGRDUSAeARFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERsMCxEaCwoRGQoJERgJCBEXCAcRGwcGERoGBREZBQQRGAQDERcDAhEbAgERGgERGYEIRyXAAPL0AHEBooFNu4EBC/hBbyQQI18DLVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vRWGAByAqiCAMPtgQEBVhRAE1n0DW+hkjBt3yBukjBtji3Q0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0/9VMGwUbwTibvL0VhdWG9s8VhkAtgBzBNogVhe6ILOOQVYRgQEBI1n0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zkXDiIbOSILORcOKSMnDjDRIis5Ihs5Fw4pIgs5Fw4uMAAuMAAIgAgQB+AHQE/OMAj3ZWG1YYVhuBAQFWEQJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKCAL/MIW6z8vQgbvLQgG8iMPgobXDIydAQNRBGyFVQ2zzJghA7msoAf3BQBANtbds83oEBAQB5AHgBBAB1AvZWGFYdVh1WHchVMFA0y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/L/8kCERMCVhoBIG6VMFn0WjCUQTP0FeIEERcEAxEYAwIRGgJWEgIBERoBERzIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAAdwB2AE4REREWEREREBEVERAPERQPDhETDg0REg0PEREPCxEQCxCvVUkQNFgAlIIQZvDZjlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAv4RFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQFYcVhlWHNs8ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQAHsAegAMDxEQD1UOAq6BAQFWEwJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKBECEhbrPy9CBu8tCAbyIw+EP4KFjbPFwBBwB8AtJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhBbyQQI18DbXDIydAhXjVVUMhVYNs8yQKCEB3NZQB/BVA0cFAj2zwAfQEEAMiCEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiAfoCAc8WAdgRFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGFYdVhoAfwK+gWsb+CdvEPhBbyQTXwOhUyWgvPL0UwOgAREWAaERFSOgiBJ/cEQEbW3bPBEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR0AgAEEADoAAAAARnJvbSBFbW1ldC5GaW5hbmNlIEJyaWRnZQL+MBEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAREYVhvbPBEWERgRFhEVERcRFREUERYRFACDAIIARhETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1/BGbIbwABb4xtb4wk2zwh2zzbPPhD+CjIcQHKBwNvIgHJkyFus5YBbyJZzMnoMVADzMlUSjMAtAC1ALQAhALm2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQEhechZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQMREwNBUACGAIUBRCBulTBZ9FowlEEz9BXighA7msoAWRERf4AQUFIUE21Z2zwBBAGOA9D0BDBtIYE9+QGAEPQPb6Hy4IcBgT35IgKAEPQXAoIAz5sBgBD0D2+h8uCHEoIAz5sBAoAQ9BfIAcj0AMkBzHABygBVIAQAhwCAWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyQCEgQEBVhFAFFn0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zAdARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGACKAfqBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDwCLARAOERAOVR3bPACMAdIRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIFk6BEYVhcAjQH8gQEBLQJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREZAfL0gQEBERnIAcgBzxbJAczJEDsCERkCAREXASBulTBZ9FowlEEz9BXiERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwLEHoQaRBYAJsBmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAI8BpoFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBAQFtAJAB/CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4hAvVhkBIG6VMFn0WjCUQTP0FeKBAQFtIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4hA+EgERGQEgbpUwWfRaMJRBM/QV4hEVERYRFQCRAHIRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3gwQqxCaEIkQeBBnEFYQRRA0QTABmhEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAAJMBpoFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBAQFtAJQB+CBukjBtjisgbvLQgG8iyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJ4gIREQJWGQEgbpUwWfRaMJRBM/QV4oEBAW0gbpIwbY4RIG7y0IBvIcgByAHPFskBzMniAxEQAxIBERkBIG6VMFn0WjCUQTP0FeIAlQB+ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDw4QzRC8EKsQmhCJEHgQZxBWEEUQNEEwAdARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAPERcPDhEYDg0RFw0MERgMCxEXCwoRGAoJERcJCBEYCAcRFwcGERgGBREXBQQRGAQDERcDAhEYAgERFwERGACXAfqBcViBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyxZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDwCYARAOERAOVR3bPACZAdQRFREYERURFBEXERQRExEWERMREhEYERIREREXEREREBEWERAPERgPDhEXDg0RFg0MERgMCxEXCwoRFgoJERgJCBEXCAcRFgcGERgGBREXBQQRFgQDERgDAhEXAgERFgERGIIA3pYRGFYXAJoB/oEBAS0CWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeJus7MBERkB8vSBAQERGcgByAHPFskBzMkQOwIRGQIBERcBIG6VMFn0WjCUQTP0FeIRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnAsQehBpEFgAmwAQEEcQNkUEQBMBgDDTHwGCEDrzpjy68uCBgQEB1wDUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1UwbBTbPH8AnQHQERYRGhEWERURGREVERQRGBEUERMRFxETERIRGhESERERGRERERARGBEQDxEXDw4RGg4NERkNDBEYDAsRFwsKERoKCREZCQgRGAgHERcHBhEaBgURGQUEERgEAxEXAwIRGgIBERkBERgAngH6gXFYgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMsWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BEWERoRFhEVERkRFREUERgRFBETERcRExESERYREhERERUREREQERQREA8REw8AnwDiDhESDg0REQ0MERAMEL9VOgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJAhERAlYRASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPwEREAEgbpUwWfRaMJRBM/QV4gwB0BEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYAKEB+oFxWIEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DLFlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPAKIA5g4REg4NERENDBEQDBC/VToCgQEBAshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQIREwJWEwEgbpUwWfRaMJRBM/QV4oEBAQLIAcgBzxbJAczJAxERAwEREgEgbpUwWfRaMJRBM/QV4g4C8hEWERoRFhEVERkRFREUERgRFBETERcRExESERoREhERERkREREQERgREA8RFw8OERoODREZDQwRGAwLERcLChEaCgkRGQkIERgIBxEXBwYRGgYFERkFBBEYBAMRFwMCERoCAREZAREYgQhHJcAA8vQRFqQRFlYX2zwAsQCkAfqBAQFUVwBWGwFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYcoCSgEr7y9BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgClAvwJERcJERcIBwZVQFYZgUNe+EFvJBNfAyK+8vQRFFYUoAERFQERFKARFAQRGgQDERkDAhEXAlYSAgERHAERGRBFEDRAE8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABERERYREREQERUREA8RFA8OERMODRESDQwREQwAsACmADILERALEK8QnhCNEHwQaxBaEEkQOEcVQ2MUAfQ1XwOCAIpn+EFvJBAjXwMnxwXy9BEWERgRFhEVERcRFREUERgRFBETERcRExESERgREhERERcREREQERgREA8RFw8OERgODREXDQwRGAwLERcLChEYCgkRFwkIERgIBxEXBwYRGAYFERcFBBEYBAMRFwMCERgCAREXAQCoAfwRGIEIRyXAAPL0ERfTD4EBAVRXAFJAQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IBWG6ASvvL0ERekERfUAdDT/zAB1DARFhEYERYRFREXERURFBEYERQRExEXERMREhEYERIREREXEREREBEYERAAqQTSDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERlWGlYZ2zxWGNs8MAMRGQMCERoCVhYCVhMCAREZAREaEEUQNEATyFVQ2zzJALYAsQCwAKoAesiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAxVOxMB7DEyERYRGBEWERURFxEVERQRGBEUERMRFxETERIRGBESERERFxERERARGBEQDxEXDw4RGA4NERcNDBEYDAsRFwsKERgKCREXCQgRGAgHERcHBhEYBgURFwUEERgEAxEXAwIRGAIBERcBERiBCEclwADy9BEX0w8ArALuERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwIRFwIBERcBERhWGVYY2zyBAQFUVgBWGgEAtgCtAfxBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgCOgEr7y9BEWpBEY0//UMBEWERkRFhEVERkRFREUERkRFBETERkRExESERkREhERERkREREQERkREA8RGQ8OERkODREZDQwRGQwLERkLChEZCgkRGQkArgP8CBEZCAcRGQcGERkGBREZBQQRGQQDERkDAhEZAgERGQERF1YY2zwEERgEAxEbAwJWEwIBERsBERoQRRA0QBPIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMALEAsACvAARVOwBaghDhzw8OUAfLHxWBAQHPABOBAQHPAIEBAc8AAciBAQHPABKBAQHPABLMyQHMBEyCAOfEIVYVvZMhwwCRcOLy9MhvAAFvjG1vjFYU2zzbPIsS2Ns8AQC1ALQAtACyBBbbPNs8ixLY2zxWFwC1ALQAtACzAjDbPNs8byIByZMhbrOWAW8iWczJ6DHQ+QIAtQC0ALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AH0gXyhAsIAEvL0ERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCCAKbAERiBAQEtAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMAtwBgAREYAfL0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOA5ztRNDUAfhj0gABjq7bPFcXERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO4Pgo1wsKgwm68uCJ2zwG0VUE2zwAxADDALkE6G1tbW1tbW1tbW1tbXBwUxH4QW8kECNfA/hBbyQQI18DBREXBQMRFQMCERQCBRETBRERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRcYEEUQNBAj2zz4QW8kECNfA9s8+EFvJBAjXwPbPPhBbyQQI18DAMEAvwC9ALoBBNs8ALsB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BeBAQsBERh/cSFulVtZ9FkwmMgBzwBBM/RB4gC8AIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEwAfARFhEXERYRFREXERURFBEXERQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJERcIBwZVQIEZJvhBbyQQI18DKMcF8vQYgQELAREYf3EhbpVbWfRZMJjIAc8AQTP0QeIAvgCAERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmggJEGcQVhBFEDRBMAHwERYRFxEWERURFxEVERQRFxEUERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCREXCAcGVUCBGSb4QW8kECNfAyjHBfL0GYEBCwERGH9xIW6VW1n0WTCYyAHPAEEz9EHiAMAAgBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrCQoQeBBnEFYQRRA0QTAB8BEWERcRFhEVERcRFREUERcRFBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkRFwgHBlVAgRkm+EFvJBAjXwMoxwXy9BqBAQsBERh/cSFulVtZ9FkwmMgBzwBBM/RB4gDCAIARFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwKCxCJEHgQZxBWEEUQNEEwAIiBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQgQEB1wCBAQHXADAQJhAlECQQIwG+gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAPQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0gAAxQCI+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMNDUAdABgQEB1wCBAQHXADARFBEXERQRFBEWERQRFBEVERQBBbXzcADHART/APSkE/S88sgLAMgCAWIA0QDJAgEgAM8AygIBIADOAMsCAUgAzQDMAHWybuNDVpcGZzOi8vUW1RWnVTS3FYUUFYSFZpWmFHWkRjTDF6S2VjdUVxbjJEMkdMTW95aXVxcXNSY4IAARsK+7UTQ0gABgALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCEb/YFtnm2eNhpADiANABLFRyEFR1Q1QXYfhDURLbPGwyMBA2RUABBwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLgggDiANMA0gCeyPhDAcx/AcoAVSBa+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVALuAY5bgCDXIXAh10nCH5UwINcLH94gghAXjUUZuo4aMNMfAYIQF41FGbry4IHTP/oAWWwSMROgAn/gghB73Zfeuo4Z0x8BghB73ZfeuvLggdM/+gBZbBIxE6ACf+Awf+BwIddJwh+VMCDXCx/eIIIQD4p+pbrjAiAA3QDUBNSCEFlfB7y6j9kw2zxsFvhBbyRRyKGCAOvCIcL/8vRAulRzq1R/y1R9yy0QiV8JIoIAt8gCxwXy9Ey6EDlecFA0MjU1NTVQBHCAQH8pRxNQaAHIVVDbPMkkVTAUQzBtbds8f+CCEBeNRRm6ANwBBgEEANUCGI8H2zxsFts8f+AwcADbANYBNvhBbyRRyKCBcc0hwv/y9EC6VHOrVH/LVH3LLQDXAt4QN18HMlMgxwWzjtZVMPhDURLbPAGBCPgCcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhQBccFFPL0WJFb4lRzq1R/y1R9yy0BBwDYA3QVXwX4J28QI6GCCvrwgGa2CKGCCvrwgKBSMKEhwgCOh1Ux2zxYoKGSbFHiJsIA4wAQPUywEEpecV4xAOAA2gDZAcI0WzJsMzNwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIIccFs5MiwgCRcOKOnHByA8gBghDVMnbbWMsfyz/JQUATECQQI21t2zySXwPiAQQBxlUgVHS8VhBUftxUftwyNTU1NSHCAI7GAXFQVHAEyFUwghBzYtCcUAXLHxPLPwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJJVUwFEMwbW3bPJJfBeJVAgEEALLTHwGCEBeNRRm68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMACE0x8BghBZXwe8uvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAAZHUkm0B4voAUVUVFEMwAhAw2zxsF9s8fwDhAN4C0PhBbyRR2aGBMzEhwv/y9EDLVHO8VhBUftxUftwuEJpfCiKBbLcCxwXy9FRzvFYQVH7cVH7cLhVfBXEywgCSMHLeVBQyggCRQQbbPBKoghAF9eEAoIIK+vCAoLzy9E3LEDpHiRA2XkABAOAA3wPeMjY2NjYQOEdl+ENREts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGHBQh3+AQFRH3hAjyFVQ2zzJEEkQOEAXEEYQRds8AQcBAAEEAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAADG0x8BghAPin6luvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHi+gBRZhYVFEMwAbrtRNDUAfhj0gABjkX6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBPg+CjXCwqDCbry4IkA4wGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8AOQABHBZAQW978wA5gEU/wD0pBP0vPLICwDnAgFiAPkA6AIBIAD3AOkCASAA8ADqAgFIAOwA6wB1sm7jQ1aXBmczovL1FtTmFjcENqY3hBN2draGpObTJCRms2ZkFpVFdBd0F3U2VRNWtLbTl4SmszTWGCACAUgA7wDtAhCpTts82zxsUQEKAO4AAiEAEKq+7UTQ0gABAgEgAPIA8QC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAgFYAPUA8wIRrxbtnm2eNirAAQoA9AFWVHQyVHQ3VHmG+CgQXhBNEDxLoPhD+CgS2zxsUjAQSBA3RlAQiRB4EGcQVgEHAk2tvJBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqCbZ42KMABCgD2AZD4Q/goEts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBBwIRviju2ebZ42KMAQoA+AACIgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLgggEKAPsA+gCoyPhDAcx/AcoAVUBQVPoCEsoAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMye1UBPYBkjB/4HAh10nCH5UwINcLH94gghAV5M5Yuo5BMNMfAYIQFeTOWLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAiob4QW8kECNfAxTHBRPy9H/gIIIQIVLUjLrjAiCCEHvdl966jwgw2zxsFts8f+ABCQEIAQIA/APwIIIQibcdCbqPOjDbPGwW+EFvJBBOED1MulR9y1R9y1R9y1YXXwqBdW0k8vSBRW34QW8kECNfA1JAxwXy9BBOVZPbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwAQEA/gD9ATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAEEA/QyNTU1NRBZEEgQN0aY+EP4KBLbPFFooFMWcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ihwf4BAIvgoFRBOED8CAREQAQ0QI8hVUNs8yRBrEFkQSgEHAQAA/wEaEDhABxBGEEXbPARQMwEEAKqCEBeNRRlQB8sfFcs/UAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAc8WAMbTHwGCEIm3HQm68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gABkdSSbQHi+gBRVRUUQzAC7PhBbyQQThA9TLpUfctUfctUfctWFxA3XwcyVVD4Q/goEts8AYEmCwJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFAHxwUW8vRVAxBOVZMBBwEDArA2NjY2UaqhcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiCXHBbOPGEowFYBCVEV8yFVQ2zzJEnB/BEEzbW3bPJM6XwXiAQYBBAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wABBQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACqghB73ZfeUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgHPFgDaAtD0BDBtAYIAz5sBgBD0D2+h8uCHAYIAz5siAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQCy0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzAAgjDTHwGCECFS1Iy68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEzgW0y+EFvJBAjXwNSMMcF8vR/AcLtRNDUAfhj0gABjkn6ANIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdRVQGwV4Pgo1wsKgwm68uCJAQsBkPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUVSAD0VjbPAEMAApwA39DEzmrDr0="
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBridge_init_args({
    $$type: "Bridge_init_args",
    chain_nonce,
    native_coin,
    burner,
    base_uri,
    transfer_fee,
    protocol_fee,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const Bridge_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
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
  2119: { message: `contract is currently paused.` },
  2296: {
    message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
  },
  4129: { message: `Invalid native token id provided` },
  5109: { message: `sender does not have withdrawer role` },
  6438: { message: `sender does not have admin role` },
  9739: { message: `Sender is not a Jetton wallet` },
  13105: { message: `JettonWallet: Not enough jettons to transfer` },
  17246: { message: `Insufficient funds Provided` },
  17773: { message: `JettonMaster: Mint can only be performed by owner` },
  19899: { message: `sender is not a bridge validator` },
  23041: { message: `No fees to withdraw` },
  25832: { message: `Previously unsupported chain. Use Add instead.` },
  27419: { message: `Insufficient Funds` },
  27831: { message: `Only owner can call this function` },
  27954: { message: `JettonMaster: Only Admin can set new owner.` },
  29016: { message: `sender does not have mapping admin role` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  30061: { message: `JettonMaster: Jetton is not mintable` },
  31905: { message: `The amount must be 0 < amount < 2^256` },
  35431: { message: `Only Burner Can Call this Method` },
  35462: { message: `JettonMaster: Only Admin can set new admin.` },
  37185: { message: `Not enough funds to transfer` },
  42688: { message: `Unsupported chain ID` },
  43365: { message: `JettonMaster: Sender is not a Jetton owner` },
  47048: { message: `JettonWallet: Only owner can burn tokens` },
  48104: { message: `sender does not have pauser role` },
  49100: { message: `Invalid wrapped token id provided` },
  50157: { message: `Previously Processed Transaction.` },
  50245: { message: `Fees not configured for this chain` },
  56982: { message: `Overwriting an existing chain. Use Update instead.` },
  59332: { message: `Target chainId cannot equal native or zero` },
  60354: { message: `JettonWallet: Not enough balance to burn tokens` },
  63413: { message: `Insufficient fee coverage.` },
};

const Bridge_types: ABIType[] = [
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
    name: "UpdateAdmin",
    header: 367316568,
    fields: [
      {
        name: "new_admin",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateOwner",
    header: 559076492,
    fields: [
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UpdateBridgeAdmin",
    header: 3847367118,
    fields: [
      {
        name: "new_admin",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RevokeBridgeValidatorRole",
    header: 1297781476,
    fields: [
      {
        name: "address_to_be_revoked",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RevokeMappingAdminRole",
    header: 749574624,
    fields: [
      {
        name: "address_to_be_revoked",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RevokePauserRole",
    header: 3801506133,
    fields: [
      {
        name: "address_to_be_revoked",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RevokeWithdrawerRole",
    header: 3011775919,
    fields: [
      {
        name: "address_to_be_revoked",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GrantBridgeValidatorRole",
    header: 1023274182,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GrantMappingAdminRole",
    header: 3374741213,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GrantPauserRole",
    header: 835048487,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GrantWithdrawerRole",
    header: 1198756930,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "TokenType",
    header: null,
    fields: [
      {
        name: "is_native_coin",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "is_native_token",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "is_wrapped_token",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "SendInstallment",
    header: 3788443406,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "tx_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "native_chain_nonce",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "target_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "destination_address",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ReceivedInstallment",
    header: 1727060366,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "tx_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "chain_nonce",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "native_chain_nonce",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "destination_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "FreezeTon",
    header: 1454467380,
    fields: [
      {
        name: "target_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "to", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "MapNativeContract",
    header: 184326790,
    fields: [
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_symbol",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "contract",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "decimals",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
    ],
  },
  {
    name: "MapWrappedContract",
    header: 989046332,
    fields: [
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_symbol",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "contract",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "decimals",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
    ],
  },
  {
    name: "AddChain",
    header: 2751922069,
    fields: [
      {
        name: "chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "chain_name",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateChain",
    header: 1203306390,
    fields: [
      {
        name: "chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "chain_name",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "ReceiveInstallment",
    header: 882722431,
    fields: [
      {
        name: "tx_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "installment",
        type: { kind: "simple", type: "InstallmentIn", optional: false },
      },
    ],
  },
  {
    name: "SetChainFee",
    header: 2586505758,
    fields: [
      {
        name: "chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "fee",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "InstallmentIn",
    header: null,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "token_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "InstallmentOut",
    header: null,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      { name: "to", type: { kind: "simple", type: "string", optional: false } },
      {
        name: "target_chain",
        type: { kind: "simple", type: "uint", optional: false, format: 16 },
      },
      {
        name: "token_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Token",
    header: null,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "decimals",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
    ],
  },
  {
    name: "ChainName",
    header: null,
    fields: [
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "TokenSymbol",
    header: null,
    fields: [
      {
        name: "symbol",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateBaseUri",
    header: 3032156853,
    fields: [
      {
        name: "new_base_uri",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateTransferFee",
    header: 1793030273,
    fields: [
      {
        name: "new_fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RemoveNativeMappedContract",
    header: 3180152699,
    fields: [
      {
        name: "token_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "RemoveWrappedMappedContract",
    header: 3150919874,
    fields: [
      {
        name: "token_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "UpdateProtocolFee",
    header: 865129320,
    fields: [
      {
        name: "new_fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
];

const Bridge_getters: ABIGetter[] = [
  {
    name: "is_paused",
    arguments: [],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
  {
    name: "bridge_validator_role",
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "bool" },
  },
  {
    name: "mapping_admin_role",
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "bool" },
  },
  {
    name: "pauser_role",
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "bool" },
  },
  {
    name: "withdrawer_role",
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "bool" },
  },
  {
    name: "default_admin_role",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "base_uri",
    arguments: [],
    returnType: { kind: "simple", type: "string", optional: false },
  },
  {
    name: "protocol_fee",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "nonce",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "native_coin",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "fees",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "TVL",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "chain_nonce",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "incoming",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "InstallmentIn",
      valueFormat: "ref",
    },
  },
  {
    name: "outgoing",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "InstallmentOut",
      valueFormat: "ref",
    },
  },
  {
    name: "native_tokens",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "Token",
      valueFormat: "ref",
    },
  },
  {
    name: "native_token_id_to_symbol",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "TokenSymbol",
      valueFormat: "ref",
    },
  },
  {
    name: "wrapped_tokens",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "Token",
      valueFormat: "ref",
    },
  },
  {
    name: "supported_chains",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "ChainName",
      valueFormat: "ref",
    },
  },
  {
    name: "wrapped_token_id_to_symbol",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "TokenSymbol",
      valueFormat: "ref",
    },
  },
  {
    name: "chain_fees",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "int" },
  },
];

const Bridge_receivers: ABIReceiver[] = [
  {
    receiver: "internal",
    message: { kind: "typed", type: "JettonTransferNotification" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "JettonBurnNotification" },
  },
  { receiver: "internal", message: { kind: "typed", type: "FreezeTon" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "MapNativeContract" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "MapWrappedContract" },
  },
  { receiver: "internal", message: { kind: "typed", type: "AddChain" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RemoveNativeMappedContract" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RemoveWrappedMappedContract" },
  },
  { receiver: "internal", message: { kind: "typed", type: "UpdateChain" } },
  { receiver: "internal", message: { kind: "text", text: "WithdrawFees" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ReceiveInstallment" },
  },
  { receiver: "internal", message: { kind: "typed", type: "SetChainFee" } },
  { receiver: "internal", message: { kind: "typed", type: "JettonExcesses" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateProtocolFee" },
  },
  { receiver: "internal", message: { kind: "typed", type: "UpdateBaseUri" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateTransferFee" },
  },
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "text", text: "Pause" } },
  { receiver: "internal", message: { kind: "text", text: "Unpause" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateBridgeAdmin" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RevokeBridgeValidatorRole" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RevokeMappingAdminRole" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RevokePauserRole" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RevokeWithdrawerRole" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "GrantBridgeValidatorRole" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "GrantMappingAdminRole" },
  },
  { receiver: "internal", message: { kind: "typed", type: "GrantPauserRole" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "GrantWithdrawerRole" },
  },
];

export class Bridge implements Contract {
  static async init(
    chain_nonce: bigint,
    native_coin: bigint,
    burner: Address,
    base_uri: string,
    transfer_fee: bigint,
    protocol_fee: bigint
  ) {
    return await Bridge_init(
      chain_nonce,
      native_coin,
      burner,
      base_uri,
      transfer_fee,
      protocol_fee
    );
  }

  static async fromInit(
    chain_nonce: bigint,
    native_coin: bigint,
    burner: Address,
    base_uri: string,
    transfer_fee: bigint,
    protocol_fee: bigint
  ) {
    const init = await Bridge_init(
      chain_nonce,
      native_coin,
      burner,
      base_uri,
      transfer_fee,
      protocol_fee
    );
    const address = contractAddress(0, init);
    return new Bridge(address, init);
  }

  static fromAddress(address: Address) {
    return new Bridge(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: Bridge_types,
    getters: Bridge_getters,
    receivers: Bridge_receivers,
    errors: Bridge_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | JettonTransferNotification
      | JettonBurnNotification
      | FreezeTon
      | MapNativeContract
      | MapWrappedContract
      | AddChain
      | RemoveNativeMappedContract
      | RemoveWrappedMappedContract
      | UpdateChain
      | "WithdrawFees"
      | ReceiveInstallment
      | SetChainFee
      | JettonExcesses
      | UpdateProtocolFee
      | UpdateBaseUri
      | UpdateTransferFee
      | null
      | Deploy
      | "Pause"
      | "Unpause"
      | UpdateBridgeAdmin
      | RevokeBridgeValidatorRole
      | RevokeMappingAdminRole
      | RevokePauserRole
      | RevokeWithdrawerRole
      | GrantBridgeValidatorRole
      | GrantMappingAdminRole
      | GrantPauserRole
      | GrantWithdrawerRole
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonTransferNotification"
    ) {
      body = beginCell()
        .store(storeJettonTransferNotification(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonBurnNotification"
    ) {
      body = beginCell().store(storeJettonBurnNotification(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "FreezeTon"
    ) {
      body = beginCell().store(storeFreezeTon(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "MapNativeContract"
    ) {
      body = beginCell().store(storeMapNativeContract(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "MapWrappedContract"
    ) {
      body = beginCell().store(storeMapWrappedContract(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AddChain"
    ) {
      body = beginCell().store(storeAddChain(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveNativeMappedContract"
    ) {
      body = beginCell()
        .store(storeRemoveNativeMappedContract(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveWrappedMappedContract"
    ) {
      body = beginCell()
        .store(storeRemoveWrappedMappedContract(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateChain"
    ) {
      body = beginCell().store(storeUpdateChain(message)).endCell();
    }
    if (message === "WithdrawFees") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ReceiveInstallment"
    ) {
      body = beginCell().store(storeReceiveInstallment(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetChainFee"
    ) {
      body = beginCell().store(storeSetChainFee(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonExcesses"
    ) {
      body = beginCell().store(storeJettonExcesses(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateProtocolFee"
    ) {
      body = beginCell().store(storeUpdateProtocolFee(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateBaseUri"
    ) {
      body = beginCell().store(storeUpdateBaseUri(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateTransferFee"
    ) {
      body = beginCell().store(storeUpdateTransferFee(message)).endCell();
    }
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (message === "Pause") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Unpause") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateBridgeAdmin"
    ) {
      body = beginCell().store(storeUpdateBridgeAdmin(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RevokeBridgeValidatorRole"
    ) {
      body = beginCell()
        .store(storeRevokeBridgeValidatorRole(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RevokeMappingAdminRole"
    ) {
      body = beginCell().store(storeRevokeMappingAdminRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RevokePauserRole"
    ) {
      body = beginCell().store(storeRevokePauserRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RevokeWithdrawerRole"
    ) {
      body = beginCell().store(storeRevokeWithdrawerRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GrantBridgeValidatorRole"
    ) {
      body = beginCell()
        .store(storeGrantBridgeValidatorRole(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GrantMappingAdminRole"
    ) {
      body = beginCell().store(storeGrantMappingAdminRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GrantPauserRole"
    ) {
      body = beginCell().store(storeGrantPauserRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GrantWithdrawerRole"
    ) {
      body = beginCell().store(storeGrantWithdrawerRole(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getIsPaused(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("is_paused", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }

  async getBridgeValidatorRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("bridge_validator_role", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt()
    );
    return result;
  }

  async getMappingAdminRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("mapping_admin_role", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt()
    );
    return result;
  }

  async getPauserRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("pauser_role", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt()
    );
    return result;
  }

  async getWithdrawerRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("withdrawer_role", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt()
    );
    return result;
  }

  async getDefaultAdminRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("default_admin_role", builder.build()))
      .stack;
    let result = source.readAddress();
    return result;
  }

  async getBaseUri(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("base_uri", builder.build())).stack;
    let result = source.readString();
    return result;
  }

  async getProtocolFee(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("protocol_fee", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getNonce(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("nonce", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getNativeCoin(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("native_coin", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getFees(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("fees", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getTvl(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("TVL", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getChainNonce(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("chain_nonce", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getIncoming(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("incoming", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserInstallmentIn(),
      source.readCellOpt()
    );
    return result;
  }

  async getOutgoing(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("outgoing", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserInstallmentOut(),
      source.readCellOpt()
    );
    return result;
  }

  async getNativeTokens(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("native_tokens", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserToken(),
      source.readCellOpt()
    );
    return result;
  }

  async getNativeTokenIdToSymbol(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (
      await provider.get("native_token_id_to_symbol", builder.build())
    ).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserTokenSymbol(),
      source.readCellOpt()
    );
    return result;
  }

  async getWrappedTokens(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("wrapped_tokens", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserToken(),
      source.readCellOpt()
    );
    return result;
  }

  async getSupportedChains(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("supported_chains", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserChainName(),
      source.readCellOpt()
    );
    return result;
  }

  async getWrappedTokenIdToSymbol(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (
      await provider.get("wrapped_token_id_to_symbol", builder.build())
    ).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserTokenSymbol(),
      source.readCellOpt()
    );
    return result;
  }

  async getChainFees(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("chain_fees", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.BigInt(257),
      source.readCellOpt()
    );
    return result;
  }
}
