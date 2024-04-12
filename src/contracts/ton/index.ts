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
  src: JettonTransferNotification,
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
  source: JettonTransferNotification,
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
        beginCell().store(storeJettonTransferNotification(src)).endCell(),
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
        beginCell().store(storeJettonInternalTransfer(src)).endCell(),
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
        beginCell().store(storeJettonBurnNotification(src)).endCell(),
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

export type AddValidator = {
  $$type: "AddValidator";
  new_validator: Address;
};

export function storeAddValidator(src: AddValidator) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2666514963, 32);
    b_0.storeAddress(src.new_validator);
  };
}

export function loadAddValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2666514963) {
    throw Error("Invalid prefix");
  }
  let _new_validator = sc_0.loadAddress();
  return { $$type: "AddValidator" as const, new_validator: _new_validator };
}

function loadTupleAddValidator(source: TupleReader) {
  let _new_validator = source.readAddress();
  return { $$type: "AddValidator" as const, new_validator: _new_validator };
}

function storeTupleAddValidator(source: AddValidator) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_validator);
  return builder.build();
}

function dictValueParserAddValidator(): DictionaryValue<AddValidator> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddValidator(src)).endCell());
    },
    parse: (src) => {
      return loadAddValidator(src.loadRef().beginParse());
    },
  };
}

export type RemoveValidator = {
  $$type: "RemoveValidator";
  validator: Address;
};

export function storeRemoveValidator(src: RemoveValidator) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(704564413, 32);
    b_0.storeAddress(src.validator);
  };
}

export function loadRemoveValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 704564413) {
    throw Error("Invalid prefix");
  }
  let _validator = sc_0.loadAddress();
  return { $$type: "RemoveValidator" as const, validator: _validator };
}

function loadTupleRemoveValidator(source: TupleReader) {
  let _validator = source.readAddress();
  return { $$type: "RemoveValidator" as const, validator: _validator };
}

function storeTupleRemoveValidator(source: RemoveValidator) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.validator);
  return builder.build();
}

function dictValueParserRemoveValidator(): DictionaryValue<RemoveValidator> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeRemoveValidator(src)).endCell());
    },
    parse: (src) => {
      return loadRemoveValidator(src.loadRef().beginParse());
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
        beginCell().store(storeReceivedInstallment(src)).endCell(),
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
        beginCell().store(storeMapNativeContract(src)).endCell(),
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
        beginCell().store(storeMapWrappedContract(src)).endCell(),
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
        beginCell().store(storeReceiveInstallment(src)).endCell(),
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

type Bridge_init_args = {
  $$type: "Bridge_init_args";
  chain_nonce: bigint;
  native_coin: bigint;
  burner: Address;
};

function initBridge_init_args(src: Bridge_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.chain_nonce, 257);
    b_0.storeInt(src.native_coin, 257);
    b_0.storeAddress(src.burner);
  };
}

async function Bridge_init(
  chain_nonce: bigint,
  native_coin: bigint,
  burner: Address,
) {
  const __code = Cell.fromBase64(
    "te6ccgECoAEAJIIAART/APSkE/S88sgLAQIBYgIDA+7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARFBETERIREREQVeDbPMntVI4EBQIBIFJTBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghBWsWk0ugYHCAkB9gEREwERFIEBAc8AARERAYEBAc8AH4EBAc8ADciBAQHPAByBAQHPABr0ABj0ABb0AATI9AAT9AD0AAHI9AAT9AAT9AADyPQAFPQAFfQABcj0ABbKAFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyVADzMlQAw8B7DEyERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERSBCEciwADy9BEV0w8RExEUERMREhEUERIREREUEREKALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAHyNV8DggCKZ/hBbyQQI18DJMcF8vQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIEIRyLAAPL0ERXTD4EBAQ0E/I6lMNMfAYIQVrFpNLry4IGBAQHXAIEBAdcA1IEBAdcAVTBsFNs8f+AgghAK/JqGuo7AMNMfAYIQCvyahrry4IGBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHVTBsFNs8f+AgghA686Y8uuMCIBAREhMC/BEQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkIERQIBxEUBwYRFAYFERQFBBEUBAMRFAMCERQCAREUAREWVhVWFds8gQEBVFMAVhcBQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IASvjsLAvTy9BETpBEW0w/UMBETERcRExESERcREhERERcREREQERcREA8RFw8OERcODREXDQwRFwwLERcLChEXCgkRFwkIERcIBxEXBwYRFwYFERcFBBEXBAMRFwMCERcCAREXAREUVhXbPDADERQDAhEWAlYTAlYQAgERGQERFxQMAZYQRRA0QBPIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RhRQMwUbAf5UVABSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAEr7y9BEUpBEU0w/UMBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFDgPOBBEUBAMRFQMCERQCAREVAREXVhZWFds8VhTbPDADERcDAhEWAlYTAlYQAgERFwERFhBFEDRAE8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA8REw8OERIODRERDQwREAxVOzsUGwAWzMlQA8zJAczJAcwC4BETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWCgkRFQkIERQIBxEXBwYRFgYFERUFBBEUBAMRFwMCERYCAREVAREUgQhHIsAA8vQRE6QRE1YX2zyBAQFUVABWGwEUFQGsERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERQcAYAw0x8BghA686Y8uvLggYEBAdcA1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdVMGwU2zx/HgSyghCkBv+Vuo6ZMNMfAYIQpAb/lbry4IHTD9QB0BJsEts8f+AgghBHuP+Wuo6ZMNMfAYIQR7j/lrry4IHTD9QB0BJsEts8f+AgghA0nUZ/uuMCIIIQmiryHrohIiMkBEyCAOfEIVYWvZMhwwCRcOLy9MhvAAFvjG1vjFYR2zzbPIsS2Ns8ARgZGRYB2kEz9AxvoZQB1wAwkltt4oIAxEUhbrPy9IIA97X4QW8kE18DAiBu8tCAVhigEr7y9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAVhUaBBbbPNs8ixLY2zxWFBgZGRcCMNs82zxvIgHJkyFus5YBbyJZzMnoMdD5AhgZAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydAAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwHYgUNe+EFvJBNfAyK+8vQREVYRoAEREgEREaAREQQRFgQDERUDAhEUAi8CAREYAREZEEUQNEATyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjVVHGwBaghDhzw8OUAfLHxWBAQHPABOBAQHPAIEBAc8AAciBAQHPABKBAQHPABLMyQHMAfaBcViBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/VTodALwCgQEBAshZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyQIREAJWEAEgbpUwWfRaMJRBM/QV4oEBAQLIAcgBzxbJAczJED4fIG6VMFn0WjCUQTP0FeILAawRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFB8B9oFxWIEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL9VOiAAtgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJIhA/ASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPB0gbpUwWfRaMJRBM/QV4gkBrBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUJQGsERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERQoAZAw0x8BghA0nUZ/uvLggYEBAdcA1AHQ0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0/9VMDQQRVUCbBXbPH84A/aOmDDTHwGCEJoq8h668uCB0w/T/1lsEts8f+AgghDVMnbbuo4UMNMfAYIQ1TJ227ry4IHTPwExMH/gIMAAItdJwSGwklt/4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CArLC0B5oFxWIEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zwmAfYREhEVERIREREUEREREBETERAPERUPDhEUDg0REw0MERUMCxEUCwoREwoJERUJCBEUCAcREwcGERUGBREUBQQREwQDERUDAhEUAgEREwERFYIA3pYRFVYUgQEBKgJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zswERFgEnAKTy9IEBAREWyAHIAc8WyQHMyRA4AhEWAgERFAEgbpUwWfRaMJRBM/QV4hEQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpCBBHEDZFBEATAeaBcViBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8KQH2ERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAIBERMBERWBZOgRFVYUgQEBKgJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREWAfL0KgCggQEBERbIAcgBzxbJAczJEDgCERYCAREUASBulTBZ9FowlEEz9BXiERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkIEEcQNkUEQBMBrBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREULgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxOA/yCEJ7vyhO6jrEw0x8BghCe78oTuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCECn+zL26jrEw0x8BghAp/sy9uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4MAAkTDjDXAwMTIB/IFxWIEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vSBAQFRIgIRFwIBERYBIW6VW1n0WjCYyAHPAEEz9ELiERERExERERAREhEQDxERDy8AEA4REA4Q31UcAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQDMBdhETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVANAPm+QEggvA6EjLdmaHztOWG/4J258U6NeX9Zxj3fF/F7YFYR63dP7rjAiCC8O+zR5Z2E25EJL1osBYpwm6YIUOgZFeUIeYSl8Fo53GRuuMCgvAij86Sj6xUSGAgPdRyqw4Fvl25gMQpa43zjQtqvn1qT7rjAjU2NwHegRkmgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BETERQRExESERMREhERERIREREQEREREA8REA9VDts8kwH4gRkmgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BeBAQsBERVwcSFulVtZ9FkwmMgBzwBBM/RB4hESERMREhERERIREREQEREREJgB5DCBE/WBAQv4QW8kECNfAydZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAydZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0gVoBVhLCAPL0+EFvJBAjXwMBERJ/WXBtbW3bPHAREX/bMU4ArDCCALvogQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9H8yf9sxAKqCALvogQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9HAyf9sxAbwRExEYERMREhEXERIREREWEREREBEVERAPERQPDhEYDg0RFw0MERYMCxEVCwoRFAoJERgJCBEXCAcRFgcGERUGBREUBQQRGAQDERcDAhEWAgERFQERFIEIRyLAAPL0OQGigU27gQEL+EFvJBAjXwMqWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMqWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9FYYOgKoggDD7YEBAVYRQBNZ9A1voZIwbd8gbpIwbY4t0NP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9P/VTBsFG8E4m7y9FYXVhbbPFYUOzwB9IF8oQLCABLy9BETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAggCmwBEVgQEBKgJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREVAfL0ERIRExESEREREhERPQTYIFYUuiCzjkAugQEBI1n0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zkXDiIbOSILORcOKSMnDjDRIis5Ihs5Fw4pIgs5Fw4uMAAuMAPj9AQQAYERAREREQDxEQD1UOAIKBAQFUThRZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuJuswH8MBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhbbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1/QgP2ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWGFYagWsb+CdvECK88vQRElYSoYgCERMCARETAX9wRARtbds8RU5GA+KO4RETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAVhdWGVYX2zwRExEUERMREhETERIRERESEREREBERERAPERAPVQ7e4wCBAQFWGFYYVhhWGEdISQLy+EP4KCLIgQEBzwDJ2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQEhechZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyUNEAM4C0PQEMG0hgT35AYAQ9A9vofLghwGBPfkiAoAQ9BcCggDPmwGAEPQPb6Hy4IcSggDPmwECgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry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jowCGayabZ5tniuIL4e2IMCOjQACJwACLgKO7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4ImBAQHXAIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwA9FY2zyQkQACLAH8gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAPQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRERERQRERERERMRERERERIREVcUERIRExESkgTwbW1tbW1tbW1tbW1tbXCBAQv4QW8kECNfAxAkf3EhbpVbWfRZMJjIAc8AQTP0QeJwUzP4QW8kECNfAwYRFAYCERICARERAQYREAYfEG4dEGwbEGoZEGgXFUMw2zz4QW8kECNfA9s8+EFvJBAjXwPbPPhBbyQQI18Dk5SVlgAkEREREhERERAREREQDxEQD1UOAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQJcBdhETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAmQF2ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUCbAQTbPJ0B+IEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQXgQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeIREhETERIRERESEREREBERERCYADgPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEwAfiBGSaBAQv4QW8kECNfAyZZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyZZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0FoEBCwERFX9xIW6VW1n0WTCYyAHPAEEz9EHiERIRExESEREREhERERAREREQmgA4DxEQDxDvEN4QzRC8EKsQmhCJEHgGBxBFEDRBMAH4gRkmgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BWBAQsBERV/cSFulVtZ9FkwmMgBzwBBM/RB4hESERMREhERERIREREQEREREJwAOA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcFBhA0QTABdhETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAngH4gRkmgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMmWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BSBAQsBERV/cSFulVtZ9FkwmMgBzwBBM/RB4hESERMREhERERIREREQEREREJ8ANg8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVgRBNQ==",
  );
  const __system = Cell.fromBase64(
    "te6cckEC3AEAMMoAAQHAAQIBILwCAgFYngMBBbd8sAQBFP8A9KQT9LzyyAsFAgFiQwYCASAvBwIBIBYIAgEgEQkCASAMCgIZs1k2zzbPFcQXw9sQYI0LAAIsAgEgDw0CGayabZ5tniuIL4e2IMCNDgACLgIZr9Rtnm2eK4gvh7YgwI0QAAInAgEgwhICAVgVEwIYqePbPNs8VxBfD2xBjRQAAi8AdKm7jQ1aXBmczovL1FtWjN4RExLSGRNalBmV21Qam11V3B0c1Juejk1WEFwSGZMRnJQdUxya0xybmuACASAqFwIBICIYAgEgIBkCASAcGgIYqrnbPNs8VxBfD2xBjRsAAigCASAeHQC3p6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkCF6axtnm2eK4gvh7Yg40fAARWEwIZrn3tnm2eK4gvh7YgwI0hAARWEQIBICgjAgHnJiQCF7y9s82zxXEF8PbEGI0lAAIkAhe9/bPNs8VxBfD2xBiNJwAEVhACGaxf7Z5tniuIL4e2IMCNKQACIwIBSC0rAhmsz22ebZ4riC+HtiDAjSwAAiYCGa2I7Z5tniuIL4e2IMCNLgACKQIBIDgwAgFYNjECASA0MgIZrQ1tnm2eK4gvh7YgwI0zAARWEgIZrb1tnm2eK4gvh7YgwI01AAIhAhmwjTbPNs8VxBfD2xBgjTcAAiICASBBOQIBIDw6AhmzBDbPNs8VxBfD2xBgjTsAAioCASA/PQIZrBXtnm2eK4gvh7YgwI0+AAItAhmug+2ebZ4riC+HtiDAjUAAAiUCGbeqG2ebZ4riC+HtiDCNQgACKwPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VSNRkQB9gEREwERFIEBAc8AARERAYEBAc8AH4EBAc8ADciBAQHPAByBAQHPABr0ABj0ABb0AATI9AAT9AD0AAHI9AAT9AAT9AADyPQAFPQAFfQABcj0ABbKAFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyVADzMlQA0UAFszJUAPMyQHMyQHMBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghBWsWk0uoHZfkcE/I6lMNMfAYIQVrFpNLry4IGBAQHXAIEBAdcA1IEBAdcAVTBsFNs8f+AgghAK/JqGuo7AMNMfAYIQCvyahrry4IGBAQHXANQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMHVTBsFNs8f+AgghA686Y8uuMCIHt4dEgEsoIQpAb/lbqOmTDTHwGCEKQG/5W68uCB0w/UAdASbBLbPH/gIIIQR7j/lrqOmTDTHwGCEEe4/5a68uCB0w/UAdASbBLbPH/gIIIQNJ1Gf7rjAiCCEJoq8h66cGxWSQP2jpgw0x8BghCaKvIeuvLggdMP0/9ZbBLbPH/gIIIQ1TJ227qOFDDTHwGCENUydtu68uCB0z8BMTB/4CDAACLXScEhsJJbf+AgghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AgU81KA/yCEJ7vyhO6jrEw0x8BghCe78oTuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4CCCECn+zL26jrEw0x8BghAp/sy9uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx2zx/4MAAkTDjDXBRT0sD5vkBIILwOhIy3Zmh87Tlhv+CdufFOjXl/WcY93xfxe2BWEet3T+64wIggvDvs0eWdhNuRCS9aLAWKcJumCFDoGRXlCHmEpfBaOdxkbrjAoLwIo/Oko+sVEhgID3UcqsOBb5duYDEKWuN840Lar59ak+64wJOTUwAqoIAu+iBAQv4QW8kECNfAyhZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyhZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0cDJ/2zEArDCCALvogQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMoWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9H8yf9sxAeQwgRP1gQEL+EFvJBAjXwMnWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMnWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IFaAVYSwgDy9PhBbyQQI18DARESf1lwbW1t2zxwERF/2zHVAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFAB+IEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQXgQELAREVcHEhbpVbWfRZMJjIAc8AQTP0QeIREhETERIRERESEREREBERERCbAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFIB3oEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPJkBrBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVAH8gXFYgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9IEBAVEiAhEXAgERFgEhbpVbWfRaMJjIAc8AQTP0QuIRERETEREREBESERAPEREPVQAQDhEQDhDfVRwBkDDTHwGCEDSdRn+68uCBgQEB1wDUAdDT//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0w/T/1UwNBBFVQJsFds8f1cBvBETERgRExESERcREhERERYREREQERUREA8RFA8OERgODREXDQwRFgwLERULChEUCgkRGAkIERcIBxEWBwYRFQYFERQFBBEYBAMRFwMCERYCAREVAREUgQhHIsAA8vRYAaKBTbuBAQv4QW8kECNfAypZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAypZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0VhhZAqiCAMPtgQEBVhFAE1n0DW+hkjBt3yBukjBtji3Q0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0/9VMGwUbwTibvL0VhdWFts8VhSLWgTYIFYUuiCzjkAugQEBI1n0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4m6zkXDiIbOSILORcOKSMnDjDRIis5Ihs5Fw4pIgs5Fw4uMAAuMAa2dkWwPijuERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYXVhlWF9s8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UO3uMAgQEBVhhWGFYYVhhhX1wC/MhVMFA0y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/L/8kCERACVhoBIG6VMFn0WjCUQTP0FeIEERcEAxEYAwIRFQIvAgERFQERF8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA4REw4NERINDBERDF5dADILERALEK8QrhCNEHwQaxBaEEkQOEcVA0ZkAJSCEGbw2Y5QB8sfFYEBAc8AE4EBAc8AgQEBzwAByIEBAc8AEoEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzALqVhZWGFYWgQEBLgJZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuKCAL/MIW6z8vQgbvLQgG8iMPgobXDIydAQNRBGyFVQ2zzJghA7msoAf3BQBANtbds8YNUAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYCroEBAVYQAln0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1lsEm8C4oEQISFus/L0IG7y0IBvIjD4Q/goWNs8XNhiAtJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiPhBbyQQI18DbXDIydAhXjVVUMhVYNs8yQKCEB3NZQB/BVA0cFAj2zxj1QDIghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4gH6AgHPFgP2ERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRWGFYagWsb+CdvECK88vQRElYSoYgCERMCARETAX9wRARtbds8ZtVlAEQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdADoAAAAARnJvbSBFbW1ldC5GaW5hbmNlIEJyaWRnZQH8MBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUVhbbPBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR1/aALy+EP4KCLIgQEBzwDJ2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiBAQEhechZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssHyWppAU4DERADQVAgbpUwWfRaMJRBM/QV4oIQO5rKAEAOf4AQUFIUE21Z2zzVAM4C0PQEMG0hgT35AYAQ9A9vofLghwGBPfkiAoAQ9BcCggDPmwGAEPQPb6Hy4IcSggDPmwECgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFszJAIKBAQFUThRZ9A1voZIwbd8gbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0wdZbBJvAuJuswGsERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERRtAeaBcViBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAylZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds8bgH2ERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAIBERMBERWBZOgRFVYUgQEBKgJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4m6zAREWAfL0bwCggQEBERbIAcgBzxbJAczJEDgCERYCAREUASBulTBZ9FowlEEz9BXiERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkIEEcQNkUEQBMBrBETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUcQHmgXFYgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3bPHIB9hESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCARETAREVggDelhEVVhSBAQEqAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrOzAREWAXMApPL0gQEBERbIAcgBzxbJAczJEDgCERYCAREUASBulTBZ9FowlEEz9BXiERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkIEEcQNkUEQBMBgDDTHwGCEDrzpjy68uCBgQEB1wDUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB1UwbBTbPH91AawRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFHYB9oFxWIEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DKVlxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL9VOncAtgKBAQECyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfJIhA/ASBulTBZ9FowlEEz9BXigQEBAsgByAHPFskBzMkQPB0gbpUwWfRaMJRBM/QV4gkBrBETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWCgkRFQkIERQIBxEXBwYRFgYFERUFBBEUBAMRFwMCERYCAREVAREUeQH2gXFYgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJus44mgQEL+EFvJBAjXwMpWXFBM/QKb6GUAdcAMJJbbeJ/IW6SW3CRuuKRcOLy9BETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQv1U6egC8AoEBAQLIWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB8kCERACVhABIG6VMFn0WjCUQTP0FeKBAQECyAHIAc8WyQHMyRA+HyBulTBZ9FowlEEz9BXiCwLgERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERSBCEciwADy9BETpBETVhfbPIEBAVRUAFYbAYZ8AdpBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgFYYoBK+8vQRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYVfQHYgUNe+EFvJBNfAyK+8vQREVYRoAEREgEREaAREQQRFgQDERUDAhEUAi8CAREYAREZEEUQNEATyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADhETDg0REg0MEREMCxEQCxCvEJ4QjVVHhQHyNV8DggCKZ/hBbyQQI18DJMcF8vQRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFIEIRyLAAPL0ERXTD4EBAX8B/lRUAFJAQTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IASvvL0ERSkERTTD9QwERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQWAA84EERQEAxEVAwIRFAIBERUBERdWFlYV2zxWFNs8MAMRFwMCERYCVhMCVhACAREXAREWEEUQNEATyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADxETDw4REg4NERENDBEQDFU7i4aFAewxMhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREUgQhHIsAA8vQRFdMPERMRFBETERIRFBESERERFBERggL8ERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQBERZWFVYV2zyBAQFUUwBWFwFBM/QMb6GUAdcAMJJbbeKCAMRFIW6z8vSCAPe1+EFvJBNfAwIgbvLQgBK+i4MC9PL0EROkERbTD9QwERMRFxETERIRFxESERERFxERERARFxEQDxEXDw4RFw4NERcNDBEXDAsRFwsKERcKCREXCQgRFwgHERcHBhEXBgURFwUEERcEAxEXAwIRFwIBERcBERRWFds8MAMRFAMCERYCVhMCVhACAREZAREXhoQBlhBFEDRAE8hVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGFFAzBYUAWoIQ4c8PDlAHyx8VgQEBzwATgQEBzwCBAQHPAAHIgQEBzwASgQEBzwASzMkBzARMggDnxCFWFr2TIcMAkXDi8vTIbwABb4xtb4xWEds82zyLEtjbPAGKiYmHBBbbPNs8ixLY2zxWFIqJiYgCMNs82zxvIgHJkyFus5YBbyJZzMnoMdD5AoqJALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AH0gXyhAsIAEvL0ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUCCAKbAERWBAQEqAln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBERUB8vQREhETERIRERESERGMABgREBERERAPERAPVQ4Cju1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wCBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMAPRWNs8nI4E8G1tbW1tbW1tbW1tbW1wgQEL+EFvJBAjXwMQJH9xIW6VW1n0WTCYyAHPAEEz9EHicFMz+EFvJBAjXwMGERQGAhESAgEREQEGERAGHxBuHRBsGxBqGRBoFxVDMNs8+EFvJBAjXwPbPPhBbyQQI18D2zz4QW8kECNfA5mWk48BBNs8kAF2ERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUCRAfiBGSaBAQv4QW8kECNfAyZZcUEz9ApvoZQB1wAwkltt4m6zjiaBAQv4QW8kECNfAyZZcUEz9ApvoZQB1wAwkltt4n8hbpJbcJG64pFw4vL0FIEBCwERFX9xIW6VW1n0WTCYyAHPAEEz9EHiERIRExESEREREhERERAREREQkgA2DxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWBEE1AXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQJQB+IEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQVgQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeIREhETERIRERESEREREBERERCVADgPERAPEO8Q3hDNELwQqxCaEIkQeBBnBQYQNEEwAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQJcB+IEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQWgQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeIREhETERIRERESEREREBERERCYADgPERAPEO8Q3hDNELwQqxCaEIkQeAYHEEUQNEEwAXYRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQJoB+IEZJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ibrOOJoEBC/hBbyQQI18DJllxQTP0Cm+hlAHXADCSW23ifyFukltwkbrikXDi8vQXgQELAREVf3EhbpVbWfRZMJjIAc8AQTP0QeIREhETERIRERESEREREBERERCbADgPERAPEO8Q3hDNELwQqxCaEIkHCBBWEEUQNEEwAfyBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcA9AT0BPQE1DDQ9AT0BPQE1DDQ9AT0BPQE1DDQ9AT0BPQE1DDQ9ATSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxERERFBERERERExEREREREhERVxQREhETERKdACQRERESEREREBERERAPERAPVQ4BBbXzcJ8BFP8A9KQT9LzyyAugAgFiqKECASCmogIBIKWjAgFIwqQAdbJu40NWlwZn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",
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBridge_init_args({
    $$type: "Bridge_init_args",
    chain_nonce,
    native_coin,
    burner,
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
  19899: { message: `sender is not a bridge validator` },
  23041: { message: `No fees to withdraw` },
  25832: { message: `Previously unsupported chain. Use Add instead.` },
  27419: { message: `Insufficient Funds` },
  27831: { message: `Only owner can call this function` },
  29016: { message: `sender does not have mapping admin role` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  30061: { message: `JettonMaster: Jetton is not mintable` },
  31905: { message: `The amount must be 0 < amount < 2^256` },
  35431: { message: `Only Burner Can Call this Method` },
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
    name: "AddValidator",
    header: 2666514963,
    fields: [
      {
        name: "new_validator",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RemoveValidator",
    header: 704564413,
    fields: [
      {
        name: "validator",
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
    returnType: { kind: "dict", key: "address", value: "bool" },
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
  { receiver: "internal", message: { kind: "typed", type: "UpdateChain" } },
  { receiver: "internal", message: { kind: "text", text: "WithdrawFees" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ReceiveInstallment" },
  },
  { receiver: "internal", message: { kind: "typed", type: "SetChainFee" } },
  { receiver: "internal", message: { kind: "typed", type: "JettonExcesses" } },
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "AddValidator" } },
  { receiver: "internal", message: { kind: "typed", type: "RemoveValidator" } },
  { receiver: "internal", message: { kind: "text", text: "Pause" } },
  { receiver: "internal", message: { kind: "text", text: "Unpause" } },
];

export class Bridge implements Contract {
  static async init(chain_nonce: bigint, native_coin: bigint, burner: Address) {
    return await Bridge_init(chain_nonce, native_coin, burner);
  }

  static async fromInit(
    chain_nonce: bigint,
    native_coin: bigint,
    burner: Address,
  ) {
    const init = await Bridge_init(chain_nonce, native_coin, burner);
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
      | UpdateChain
      | "WithdrawFees"
      | ReceiveInstallment
      | SetChainFee
      | JettonExcesses
      | null
      | Deploy
      | AddValidator
      | RemoveValidator
      | "Pause"
      | "Unpause",
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
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AddValidator"
    ) {
      body = beginCell().store(storeAddValidator(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveValidator"
    ) {
      body = beginCell().store(storeRemoveValidator(message)).endCell();
    }
    if (message === "Pause") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Unpause") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
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
      source.readCellOpt(),
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
      source.readCellOpt(),
    );
    return result;
  }

  async getPauserRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("pauser_role", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt(),
    );
    return result;
  }

  async getWithdrawerRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("withdrawer_role", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt(),
    );
    return result;
  }

  async getDefaultAdminRole(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("default_admin_role", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Bool(),
      source.readCellOpt(),
    );
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
      source.readCellOpt(),
    );
    return result;
  }

  async getOutgoing(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("outgoing", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserInstallmentOut(),
      source.readCellOpt(),
    );
    return result;
  }

  async getNativeTokens(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("native_tokens", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserToken(),
      source.readCellOpt(),
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
      source.readCellOpt(),
    );
    return result;
  }

  async getWrappedTokens(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("wrapped_tokens", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserToken(),
      source.readCellOpt(),
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
      source.readCellOpt(),
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
      source.readCellOpt(),
    );
    return result;
  }

  async getChainFees(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("chain_fees", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.BigInt(257),
      source.readCellOpt(),
    );
    return result;
  }
}
