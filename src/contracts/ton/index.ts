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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateAdmin(src)).endCell());
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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateOwner(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateOwner(src.loadRef().beginParse());
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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTokenType(src)).endCell());
    },
    parse: (src) => {
      return loadTokenType(src.loadRef().beginParse());
    },
  };
}

export type TokenTransfer = {
  $$type: "TokenTransfer";
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address | null;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.sender);
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

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "TokenTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _response_destination = source.readAddressOpt();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "TokenTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTokenTransfer(src.loadRef().beginParse());
    },
  };
}

export type Installment = {
  $$type: "Installment";
  from_chain: bigint;
  target_chain: bigint;
  amount: bigint;
  nonce: bigint;
  from_token: Cell;
  to_token: Cell;
  recepient: Address;
};

export function storeInstallment(src: Installment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2305391280, 32);
    b_0.storeUint(src.from_chain, 64);
    b_0.storeUint(src.target_chain, 64);
    b_0.storeCoins(src.amount);
    b_0.storeInt(src.nonce, 257);
    b_0.storeRef(src.from_token);
    b_0.storeRef(src.to_token);
    b_0.storeAddress(src.recepient);
  };
}

export function loadInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2305391280) {
    throw Error("Invalid prefix");
  }
  let _from_chain = sc_0.loadUintBig(64);
  let _target_chain = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _nonce = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _recepient = sc_0.loadAddress();
  return {
    $$type: "Installment" as const,
    from_chain: _from_chain,
    target_chain: _target_chain,
    amount: _amount,
    nonce: _nonce,
    from_token: _from_token,
    to_token: _to_token,
    recepient: _recepient,
  };
}

function loadTupleInstallment(source: TupleReader) {
  let _from_chain = source.readBigNumber();
  let _target_chain = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _nonce = source.readBigNumber();
  let _from_token = source.readCell();
  let _to_token = source.readCell();
  let _recepient = source.readAddress();
  return {
    $$type: "Installment" as const,
    from_chain: _from_chain,
    target_chain: _target_chain,
    amount: _amount,
    nonce: _nonce,
    from_token: _from_token,
    to_token: _to_token,
    recepient: _recepient,
  };
}

function storeTupleInstallment(source: Installment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.from_chain);
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.amount);
  builder.writeNumber(source.nonce);
  builder.writeCell(source.from_token);
  builder.writeCell(source.to_token);
  builder.writeAddress(source.recepient);
  return builder.build();
}

function dictValueParserInstallment(): DictionaryValue<Installment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeInstallment(src)).endCell());
    },
    parse: (src) => {
      return loadInstallment(src.loadRef().beginParse());
    },
  };
}

export type SignerAndSignature = {
  $$type: "SignerAndSignature";
  signature: Cell;
  key: bigint;
};

export function storeSignerAndSignature(src: SignerAndSignature) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.signature);
    b_0.storeUint(src.key, 256);
  };
}

export function loadSignerAndSignature(slice: Slice) {
  let sc_0 = slice;
  let _signature = sc_0.loadRef();
  let _key = sc_0.loadUintBig(256);
  return {
    $$type: "SignerAndSignature" as const,
    signature: _signature,
    key: _key,
  };
}

function loadTupleSignerAndSignature(source: TupleReader) {
  let _signature = source.readCell();
  let _key = source.readBigNumber();
  return {
    $$type: "SignerAndSignature" as const,
    signature: _signature,
    key: _key,
  };
}

function storeTupleSignerAndSignature(source: SignerAndSignature) {
  let builder = new TupleBuilder();
  builder.writeSlice(source.signature);
  builder.writeNumber(source.key);
  return builder.build();
}

function dictValueParserSignerAndSignature(): DictionaryValue<SignerAndSignature> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeSignerAndSignature(src)).endCell()
      );
    },
    parse: (src) => {
      return loadSignerAndSignature(src.loadRef().beginParse());
    },
  };
}

export type ReceiveInstallment = {
  $$type: "ReceiveInstallment";
  installment: Installment;
  signatures: Dictionary<bigint, SignerAndSignature>;
  len: bigint;
  tx_hash: bigint;
  id: bigint;
};

export function storeReceiveInstallment(src: ReceiveInstallment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(387504523, 32);
    b_0.store(storeInstallment(src.installment));
    b_0.storeDict(
      src.signatures,
      Dictionary.Keys.BigInt(257),
      dictValueParserSignerAndSignature()
    );
    let b_1 = new Builder();
    b_1.storeInt(src.len, 257);
    b_1.storeUint(src.tx_hash, 256);
    b_1.storeInt(src.id, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadReceiveInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 387504523) {
    throw Error("Invalid prefix");
  }
  let _installment = loadInstallment(sc_0);
  let _signatures = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserSignerAndSignature(),
    sc_0
  );
  let sc_1 = sc_0.loadRef().beginParse();
  let _len = sc_1.loadIntBig(257);
  let _tx_hash = sc_1.loadUintBig(256);
  let _id = sc_1.loadIntBig(257);
  return {
    $$type: "ReceiveInstallment" as const,
    installment: _installment,
    signatures: _signatures,
    len: _len,
    tx_hash: _tx_hash,
    id: _id,
  };
}

function loadTupleReceiveInstallment(source: TupleReader) {
  const _installment = loadTupleInstallment(source.readTuple());
  let _signatures = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserSignerAndSignature(),
    source.readCellOpt()
  );
  let _len = source.readBigNumber();
  let _tx_hash = source.readBigNumber();
  let _id = source.readBigNumber();
  return {
    $$type: "ReceiveInstallment" as const,
    installment: _installment,
    signatures: _signatures,
    len: _len,
    tx_hash: _tx_hash,
    id: _id,
  };
}

function storeTupleReceiveInstallment(source: ReceiveInstallment) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleInstallment(source.installment));
  builder.writeCell(
    source.signatures.size > 0
      ? beginCell()
          .storeDictDirect(
            source.signatures,
            Dictionary.Keys.BigInt(257),
            dictValueParserSignerAndSignature()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.len);
  builder.writeNumber(source.tx_hash);
  builder.writeNumber(source.id);
  return builder.build();
}

function dictValueParserReceiveInstallment(): DictionaryValue<ReceiveInstallment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeReceiveInstallment(src)).endCell()
      );
    },
    parse: (src) => {
      return loadReceiveInstallment(src.loadRef().beginParse());
    },
  };
}

export type FreezeTon = {
  $$type: "FreezeTon";
  target_chain: bigint;
  to_token: Cell;
  to: Cell;
  from_token: Cell;
  amount: bigint;
};

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
  if (sc_0.loadUint(32) !== 3943853515) {
    throw Error("Invalid prefix");
  }
  let _target_chain = sc_0.loadUintBig(64);
  let _to_token = sc_0.loadRef();
  let _to = sc_0.loadRef();
  let _from_token = sc_0.loadRef();
  let _amount = sc_0.loadCoins();
  return {
    $$type: "FreezeTon" as const,
    target_chain: _target_chain,
    to_token: _to_token,
    to: _to,
    from_token: _from_token,
    amount: _amount,
  };
}

function loadTupleFreezeTon(source: TupleReader) {
  let _target_chain = source.readBigNumber();
  let _to_token = source.readCell();
  let _to = source.readCell();
  let _from_token = source.readCell();
  let _amount = source.readBigNumber();
  return {
    $$type: "FreezeTon" as const,
    target_chain: _target_chain,
    to_token: _to_token,
    to: _to,
    from_token: _from_token,
    amount: _amount,
  };
}

function storeTupleFreezeTon(source: FreezeTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.target_chain);
  builder.writeCell(source.to_token);
  builder.writeCell(source.to);
  builder.writeCell(source.from_token);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserFreezeTon(): DictionaryValue<FreezeTon> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFreezeTon(src)).endCell());
    },
    parse: (src) => {
      return loadFreezeTon(src.loadRef().beginParse());
    },
  };
}

export type MapContract = {
  $$type: "MapContract";
  token_id: bigint;
  token_symbol: string;
  contract: Address;
  decimals: bigint;
  fee: bigint;
  fee_decimals: bigint;
  swap_address: Address;
  token_bridge_wallet_address: Address;
  liquidity_pool_master_address: Address | null;
  ston_fi_target_token_wallet_for_ston_fi_router: Address;
};

export function storeMapContract(src: MapContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4200416724, 32);
    b_0.storeInt(src.token_id, 257);
    b_0.storeStringRefTail(src.token_symbol);
    b_0.storeAddress(src.contract);
    b_0.storeUint(src.decimals, 8);
    b_0.storeInt(src.fee, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.fee_decimals, 257);
    b_1.storeAddress(src.swap_address);
    b_1.storeAddress(src.token_bridge_wallet_address);
    let b_2 = new Builder();
    b_2.storeAddress(src.liquidity_pool_master_address);
    b_2.storeAddress(src.ston_fi_target_token_wallet_for_ston_fi_router);
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadMapContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4200416724) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadIntBig(257);
  let _token_symbol = sc_0.loadStringRefTail();
  let _contract = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  let _fee = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _fee_decimals = sc_1.loadIntBig(257);
  let _swap_address = sc_1.loadAddress();
  let _token_bridge_wallet_address = sc_1.loadAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _liquidity_pool_master_address = sc_2.loadMaybeAddress();
  let _ston_fi_target_token_wallet_for_ston_fi_router = sc_2.loadAddress();
  return {
    $$type: "MapContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
    fee: _fee,
    fee_decimals: _fee_decimals,
    swap_address: _swap_address,
    token_bridge_wallet_address: _token_bridge_wallet_address,
    liquidity_pool_master_address: _liquidity_pool_master_address,
    ston_fi_target_token_wallet_for_ston_fi_router:
      _ston_fi_target_token_wallet_for_ston_fi_router,
  };
}

function loadTupleMapContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  let _token_symbol = source.readString();
  let _contract = source.readAddress();
  let _decimals = source.readBigNumber();
  let _fee = source.readBigNumber();
  let _fee_decimals = source.readBigNumber();
  let _swap_address = source.readAddress();
  let _token_bridge_wallet_address = source.readAddress();
  let _liquidity_pool_master_address = source.readAddressOpt();
  let _ston_fi_target_token_wallet_for_ston_fi_router = source.readAddress();
  return {
    $$type: "MapContract" as const,
    token_id: _token_id,
    token_symbol: _token_symbol,
    contract: _contract,
    decimals: _decimals,
    fee: _fee,
    fee_decimals: _fee_decimals,
    swap_address: _swap_address,
    token_bridge_wallet_address: _token_bridge_wallet_address,
    liquidity_pool_master_address: _liquidity_pool_master_address,
    ston_fi_target_token_wallet_for_ston_fi_router:
      _ston_fi_target_token_wallet_for_ston_fi_router,
  };
}

function storeTupleMapContract(source: MapContract) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  builder.writeString(source.token_symbol);
  builder.writeAddress(source.contract);
  builder.writeNumber(source.decimals);
  builder.writeNumber(source.fee);
  builder.writeNumber(source.fee_decimals);
  builder.writeAddress(source.swap_address);
  builder.writeAddress(source.token_bridge_wallet_address);
  builder.writeAddress(source.liquidity_pool_master_address);
  builder.writeAddress(source.ston_fi_target_token_wallet_for_ston_fi_router);
  return builder.build();
}

function dictValueParserMapContract(): DictionaryValue<MapContract> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMapContract(src)).endCell());
    },
    parse: (src) => {
      return loadMapContract(src.loadRef().beginParse());
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
    b_0.storeUint(1240718718, 32);
    b_0.storeUint(src.chain_id, 64);
    b_0.storeUint(src.fee, 256);
  };
}

export function loadSetChainFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1240718718) {
    throw Error("Invalid prefix");
  }
  let _chain_id = sc_0.loadUintBig(64);
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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetChainFee(src)).endCell());
    },
    parse: (src) => {
      return loadSetChainFee(src.loadRef().beginParse());
    },
  };
}

export type OutgoingTransaction = {
  $$type: "OutgoingTransaction";
  id: bigint;
  amount: bigint;
  from_token: Cell;
  to_token: Cell;
  to: Cell;
  target_chain_id: bigint;
};

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
  if (sc_0.loadUint(32) !== 1673830231) {
    throw Error("Invalid prefix");
  }
  let _id = sc_0.loadUintBig(256);
  let _amount = sc_0.loadCoins();
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _to = sc_0.loadRef();
  let _target_chain_id = sc_0.loadUintBig(64);
  return {
    $$type: "OutgoingTransaction" as const,
    id: _id,
    amount: _amount,
    from_token: _from_token,
    to_token: _to_token,
    to: _to,
    target_chain_id: _target_chain_id,
  };
}

function loadTupleOutgoingTransaction(source: TupleReader) {
  let _id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from_token = source.readCell();
  let _to_token = source.readCell();
  let _to = source.readCell();
  let _target_chain_id = source.readBigNumber();
  return {
    $$type: "OutgoingTransaction" as const,
    id: _id,
    amount: _amount,
    from_token: _from_token,
    to_token: _to_token,
    to: _to,
    target_chain_id: _target_chain_id,
  };
}

function storeTupleOutgoingTransaction(source: OutgoingTransaction) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeNumber(source.amount);
  builder.writeCell(source.from_token);
  builder.writeCell(source.to_token);
  builder.writeCell(source.to);
  builder.writeNumber(source.target_chain_id);
  return builder.build();
}

function dictValueParserOutgoingTransaction(): DictionaryValue<OutgoingTransaction> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeOutgoingTransaction(src)).endCell()
      );
    },
    parse: (src) => {
      return loadOutgoingTransaction(src.loadRef().beginParse());
    },
  };
}

export type IncomingTransaction = {
  $$type: "IncomingTransaction";
  id: bigint;
  amount: bigint;
  from_token: Cell;
  to_token: Cell;
  target_chain_id: bigint;
  to: Address;
};

export function storeIncomingTransaction(src: IncomingTransaction) {
  return (builder: Builder) => {
    let b_0 = builder;
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
  let _id = sc_0.loadUintBig(256);
  let _amount = sc_0.loadCoins();
  let _from_token = sc_0.loadRef();
  let _to_token = sc_0.loadRef();
  let _target_chain_id = sc_0.loadUintBig(64);
  let _to = sc_0.loadAddress();
  return {
    $$type: "IncomingTransaction" as const,
    id: _id,
    amount: _amount,
    from_token: _from_token,
    to_token: _to_token,
    target_chain_id: _target_chain_id,
    to: _to,
  };
}

function loadTupleIncomingTransaction(source: TupleReader) {
  let _id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from_token = source.readCell();
  let _to_token = source.readCell();
  let _target_chain_id = source.readBigNumber();
  let _to = source.readAddress();
  return {
    $$type: "IncomingTransaction" as const,
    id: _id,
    amount: _amount,
    from_token: _from_token,
    to_token: _to_token,
    target_chain_id: _target_chain_id,
    to: _to,
  };
}

function storeTupleIncomingTransaction(source: IncomingTransaction) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeNumber(source.amount);
  builder.writeCell(source.from_token);
  builder.writeCell(source.to_token);
  builder.writeNumber(source.target_chain_id);
  builder.writeAddress(source.to);
  return builder.build();
}

function dictValueParserIncomingTransaction(): DictionaryValue<IncomingTransaction> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeIncomingTransaction(src)).endCell()
      );
    },
    parse: (src) => {
      return loadIncomingTransaction(src.loadRef().beginParse());
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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeInstallmentOut(src)).endCell());
    },
    parse: (src) => {
      return loadInstallmentOut(src.loadRef().beginParse());
    },
  };
}

export type Token = {
  $$type: "Token";
  symbol: string;
  address: Address;
  swap_address: Address;
  decimals: bigint;
  fee: bigint;
  fee_decimals: bigint;
  token_bridge_wallet_address: Address;
  liquidity_pool_master_address: Address | null;
  ston_fi_target_token_wallet_for_ston_fi_router: Address | null;
};

export function storeToken(src: Token) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeStringRefTail(src.symbol);
    b_0.storeAddress(src.address);
    b_0.storeAddress(src.swap_address);
    b_0.storeUint(src.decimals, 8);
    b_0.storeInt(src.fee, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.fee_decimals, 257);
    b_1.storeAddress(src.token_bridge_wallet_address);
    b_1.storeAddress(src.liquidity_pool_master_address);
    let b_2 = new Builder();
    b_2.storeAddress(src.ston_fi_target_token_wallet_for_ston_fi_router);
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadToken(slice: Slice) {
  let sc_0 = slice;
  let _symbol = sc_0.loadStringRefTail();
  let _address = sc_0.loadAddress();
  let _swap_address = sc_0.loadAddress();
  let _decimals = sc_0.loadUintBig(8);
  let _fee = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _fee_decimals = sc_1.loadIntBig(257);
  let _token_bridge_wallet_address = sc_1.loadAddress();
  let _liquidity_pool_master_address = sc_1.loadMaybeAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _ston_fi_target_token_wallet_for_ston_fi_router = sc_2.loadMaybeAddress();
  return {
    $$type: "Token" as const,
    symbol: _symbol,
    address: _address,
    swap_address: _swap_address,
    decimals: _decimals,
    fee: _fee,
    fee_decimals: _fee_decimals,
    token_bridge_wallet_address: _token_bridge_wallet_address,
    liquidity_pool_master_address: _liquidity_pool_master_address,
    ston_fi_target_token_wallet_for_ston_fi_router:
      _ston_fi_target_token_wallet_for_ston_fi_router,
  };
}

function loadTupleToken(source: TupleReader) {
  let _symbol = source.readString();
  let _address = source.readAddress();
  let _swap_address = source.readAddress();
  let _decimals = source.readBigNumber();
  let _fee = source.readBigNumber();
  let _fee_decimals = source.readBigNumber();
  let _token_bridge_wallet_address = source.readAddress();
  let _liquidity_pool_master_address = source.readAddressOpt();
  let _ston_fi_target_token_wallet_for_ston_fi_router = source.readAddressOpt();
  return {
    $$type: "Token" as const,
    symbol: _symbol,
    address: _address,
    swap_address: _swap_address,
    decimals: _decimals,
    fee: _fee,
    fee_decimals: _fee_decimals,
    token_bridge_wallet_address: _token_bridge_wallet_address,
    liquidity_pool_master_address: _liquidity_pool_master_address,
    ston_fi_target_token_wallet_for_ston_fi_router:
      _ston_fi_target_token_wallet_for_ston_fi_router,
  };
}

function storeTupleToken(source: Token) {
  let builder = new TupleBuilder();
  builder.writeString(source.symbol);
  builder.writeAddress(source.address);
  builder.writeAddress(source.swap_address);
  builder.writeNumber(source.decimals);
  builder.writeNumber(source.fee);
  builder.writeNumber(source.fee_decimals);
  builder.writeAddress(source.token_bridge_wallet_address);
  builder.writeAddress(source.liquidity_pool_master_address);
  builder.writeAddress(source.ston_fi_target_token_wallet_for_ston_fi_router);
  return builder.build();
}

function dictValueParserToken(): DictionaryValue<Token> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeToken(src)).endCell());
    },
    parse: (src) => {
      return loadToken(src.loadRef().beginParse());
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
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateBaseUri(src)).endCell());
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
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeUpdateTransferFee(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateTransferFee(src.loadRef().beginParse());
    },
  };
}

export type RemoveMappedContract = {
  $$type: "RemoveMappedContract";
  token_id: bigint;
};

export function storeRemoveMappedContract(src: RemoveMappedContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1790492737, 32);
    b_0.storeUint(src.token_id, 256);
  };
}

export function loadRemoveMappedContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1790492737) {
    throw Error("Invalid prefix");
  }
  let _token_id = sc_0.loadUintBig(256);
  return { $$type: "RemoveMappedContract" as const, token_id: _token_id };
}

function loadTupleRemoveMappedContract(source: TupleReader) {
  let _token_id = source.readBigNumber();
  return { $$type: "RemoveMappedContract" as const, token_id: _token_id };
}

function storeTupleRemoveMappedContract(source: RemoveMappedContract) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.token_id);
  return builder.build();
}

function dictValueParserRemoveMappedContract(): DictionaryValue<RemoveMappedContract> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeRemoveMappedContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRemoveMappedContract(src.loadRef().beginParse());
    },
  };
}

export type ReleaseTokens = {
  $$type: "ReleaseTokens";
  to: Address;
  amount: bigint;
  body: Cell | null;
};

export function storeReleaseTokens(src: ReleaseTokens) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2408663073, 32);
    b_0.storeAddress(src.to);
    b_0.storeCoins(src.amount);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadReleaseTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2408663073) {
    throw Error("Invalid prefix");
  }
  let _to = sc_0.loadAddress();
  let _amount = sc_0.loadCoins();
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "ReleaseTokens" as const,
    to: _to,
    amount: _amount,
    body: _body,
  };
}

function loadTupleReleaseTokens(source: TupleReader) {
  let _to = source.readAddress();
  let _amount = source.readBigNumber();
  let _body = source.readCellOpt();
  return {
    $$type: "ReleaseTokens" as const,
    to: _to,
    amount: _amount,
    body: _body,
  };
}

function storeTupleReleaseTokens(source: ReleaseTokens) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.amount);
  builder.writeCell(source.body);
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

export type UniqueReceiveInstallment = {
  $$type: "UniqueReceiveInstallment";
  ri: ReceiveInstallment;
};

export function storeUniqueReceiveInstallment(src: UniqueReceiveInstallment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(952014607, 32);
    b_0.store(storeReceiveInstallment(src.ri));
  };
}

export function loadUniqueReceiveInstallment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 952014607) {
    throw Error("Invalid prefix");
  }
  let _ri = loadReceiveInstallment(sc_0);
  return { $$type: "UniqueReceiveInstallment" as const, ri: _ri };
}

function loadTupleUniqueReceiveInstallment(source: TupleReader) {
  const _ri = loadTupleReceiveInstallment(source.readTuple());
  return { $$type: "UniqueReceiveInstallment" as const, ri: _ri };
}

function storeTupleUniqueReceiveInstallment(source: UniqueReceiveInstallment) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleReceiveInstallment(source.ri));
  return builder.build();
}

function dictValueParserUniqueReceiveInstallment(): DictionaryValue<UniqueReceiveInstallment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeUniqueReceiveInstallment(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUniqueReceiveInstallment(src.loadRef().beginParse());
    },
  };
}

export type Strategies = {
  $$type: "Strategies";
  strategies: Dictionary<bigint, Steps>;
};

export function storeStrategies(src: Strategies) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.strategies,
      Dictionary.Keys.BigInt(257),
      dictValueParserSteps()
    );
  };
}

export function loadStrategies(slice: Slice) {
  let sc_0 = slice;
  let _strategies = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserSteps(),
    sc_0
  );
  return { $$type: "Strategies" as const, strategies: _strategies };
}

function loadTupleStrategies(source: TupleReader) {
  let _strategies = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserSteps(),
    source.readCellOpt()
  );
  return { $$type: "Strategies" as const, strategies: _strategies };
}

function storeTupleStrategies(source: Strategies) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.strategies.size > 0
      ? beginCell()
          .storeDictDirect(
            source.strategies,
            Dictionary.Keys.BigInt(257),
            dictValueParserSteps()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserStrategies(): DictionaryValue<Strategies> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStrategies(src)).endCell());
    },
    parse: (src) => {
      return loadStrategies(src.loadRef().beginParse());
    },
  };
}

export type ToTokenCrossChainStrategy = {
  $$type: "ToTokenCrossChainStrategy";
  to_token: Dictionary<bigint, CrossChainStrategy>;
};

export function storeToTokenCrossChainStrategy(src: ToTokenCrossChainStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.to_token,
      Dictionary.Keys.BigInt(257),
      dictValueParserCrossChainStrategy()
    );
  };
}

export function loadToTokenCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  let _to_token = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserCrossChainStrategy(),
    sc_0
  );
  return { $$type: "ToTokenCrossChainStrategy" as const, to_token: _to_token };
}

function loadTupleToTokenCrossChainStrategy(source: TupleReader) {
  let _to_token = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserCrossChainStrategy(),
    source.readCellOpt()
  );
  return { $$type: "ToTokenCrossChainStrategy" as const, to_token: _to_token };
}

function storeTupleToTokenCrossChainStrategy(
  source: ToTokenCrossChainStrategy
) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.to_token.size > 0
      ? beginCell()
          .storeDictDirect(
            source.to_token,
            Dictionary.Keys.BigInt(257),
            dictValueParserCrossChainStrategy()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserToTokenCrossChainStrategy(): DictionaryValue<ToTokenCrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeToTokenCrossChainStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadToTokenCrossChainStrategy(src.loadRef().beginParse());
    },
  };
}

export type CrossChainTokenStrategy = {
  $$type: "CrossChainTokenStrategy";
  from_token: Dictionary<bigint, ToTokenCrossChainStrategy>;
};

export function storeCrossChainTokenStrategy(src: CrossChainTokenStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.from_token,
      Dictionary.Keys.BigInt(257),
      dictValueParserToTokenCrossChainStrategy()
    );
  };
}

export function loadCrossChainTokenStrategy(slice: Slice) {
  let sc_0 = slice;
  let _from_token = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserToTokenCrossChainStrategy(),
    sc_0
  );
  return {
    $$type: "CrossChainTokenStrategy" as const,
    from_token: _from_token,
  };
}

function loadTupleCrossChainTokenStrategy(source: TupleReader) {
  let _from_token = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserToTokenCrossChainStrategy(),
    source.readCellOpt()
  );
  return {
    $$type: "CrossChainTokenStrategy" as const,
    from_token: _from_token,
  };
}

function storeTupleCrossChainTokenStrategy(source: CrossChainTokenStrategy) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.from_token.size > 0
      ? beginCell()
          .storeDictDirect(
            source.from_token,
            Dictionary.Keys.BigInt(257),
            dictValueParserToTokenCrossChainStrategy()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserCrossChainTokenStrategy(): DictionaryValue<CrossChainTokenStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeCrossChainTokenStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadCrossChainTokenStrategy(src.loadRef().beginParse());
    },
  };
}

export type FromTokenToTargetTokenToSteps = {
  $$type: "FromTokenToTargetTokenToSteps";
  i: Dictionary<bigint, TargetTokenToSteps>;
};

export function storeFromTokenToTargetTokenToSteps(
  src: FromTokenToTargetTokenToSteps
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.i,
      Dictionary.Keys.BigInt(257),
      dictValueParserTargetTokenToSteps()
    );
  };
}

export function loadFromTokenToTargetTokenToSteps(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserTargetTokenToSteps(),
    sc_0
  );
  return { $$type: "FromTokenToTargetTokenToSteps" as const, i: _i };
}

function loadTupleFromTokenToTargetTokenToSteps(source: TupleReader) {
  let _i = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserTargetTokenToSteps(),
    source.readCellOpt()
  );
  return { $$type: "FromTokenToTargetTokenToSteps" as const, i: _i };
}

function storeTupleFromTokenToTargetTokenToSteps(
  source: FromTokenToTargetTokenToSteps
) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.i.size > 0
      ? beginCell()
          .storeDictDirect(
            source.i,
            Dictionary.Keys.BigInt(257),
            dictValueParserTargetTokenToSteps()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserFromTokenToTargetTokenToSteps(): DictionaryValue<FromTokenToTargetTokenToSteps> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeFromTokenToTargetTokenToSteps(src)).endCell()
      );
    },
    parse: (src) => {
      return loadFromTokenToTargetTokenToSteps(src.loadRef().beginParse());
    },
  };
}

export type TargetTokenToSteps = {
  $$type: "TargetTokenToSteps";
  i: Dictionary<bigint, Steps>;
};

export function storeTargetTokenToSteps(src: TargetTokenToSteps) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.i, Dictionary.Keys.BigInt(257), dictValueParserSteps());
  };
}

export function loadTargetTokenToSteps(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserSteps(),
    sc_0
  );
  return { $$type: "TargetTokenToSteps" as const, i: _i };
}

function loadTupleTargetTokenToSteps(source: TupleReader) {
  let _i = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserSteps(),
    source.readCellOpt()
  );
  return { $$type: "TargetTokenToSteps" as const, i: _i };
}

function storeTupleTargetTokenToSteps(source: TargetTokenToSteps) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.i.size > 0
      ? beginCell()
          .storeDictDirect(
            source.i,
            Dictionary.Keys.BigInt(257),
            dictValueParserSteps()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserTargetTokenToSteps(): DictionaryValue<TargetTokenToSteps> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeTargetTokenToSteps(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTargetTokenToSteps(src.loadRef().beginParse());
    },
  };
}

export type Steps = {
  $$type: "Steps";
  steps: Dictionary<bigint, bigint>;
  size: bigint;
};

export function storeSteps(src: Steps) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.steps,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.BigInt(257)
    );
    b_0.storeInt(src.size, 257);
  };
}

export function loadSteps(slice: Slice) {
  let sc_0 = slice;
  let _steps = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.BigInt(257),
    sc_0
  );
  let _size = sc_0.loadIntBig(257);
  return { $$type: "Steps" as const, steps: _steps, size: _size };
}

function loadTupleSteps(source: TupleReader) {
  let _steps = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  let _size = source.readBigNumber();
  return { $$type: "Steps" as const, steps: _steps, size: _size };
}

function storeTupleSteps(source: Steps) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.steps.size > 0
      ? beginCell()
          .storeDictDirect(
            source.steps,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.size);
  return builder.build();
}

function dictValueParserSteps(): DictionaryValue<Steps> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSteps(src)).endCell());
    },
    parse: (src) => {
      return loadSteps(src.loadRef().beginParse());
    },
  };
}

export type CrossChainStrategy = {
  $$type: "CrossChainStrategy";
  local_steps: Steps;
  foreign_steps: Steps;
};

export function storeCrossChainStrategy(src: CrossChainStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.store(storeSteps(src.local_steps));
    b_0.store(storeSteps(src.foreign_steps));
  };
}

export function loadCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  let _local_steps = loadSteps(sc_0);
  let _foreign_steps = loadSteps(sc_0);
  return {
    $$type: "CrossChainStrategy" as const,
    local_steps: _local_steps,
    foreign_steps: _foreign_steps,
  };
}

function loadTupleCrossChainStrategy(source: TupleReader) {
  const _local_steps = loadTupleSteps(source.readTuple());
  const _foreign_steps = loadTupleSteps(source.readTuple());
  return {
    $$type: "CrossChainStrategy" as const,
    local_steps: _local_steps,
    foreign_steps: _foreign_steps,
  };
}

function storeTupleCrossChainStrategy(source: CrossChainStrategy) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleSteps(source.local_steps));
  builder.writeTuple(storeTupleSteps(source.foreign_steps));
  return builder.build();
}

function dictValueParserCrossChainStrategy(): DictionaryValue<CrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeCrossChainStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadCrossChainStrategy(src.loadRef().beginParse());
    },
  };
}

export type TargetTokenToCrossChainStrategy = {
  $$type: "TargetTokenToCrossChainStrategy";
  i: Dictionary<bigint, CrossChainStrategy>;
};

export function storeTargetTokenToCrossChainStrategy(
  src: TargetTokenToCrossChainStrategy
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.i,
      Dictionary.Keys.BigInt(257),
      dictValueParserCrossChainStrategy()
    );
  };
}

export function loadTargetTokenToCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserCrossChainStrategy(),
    sc_0
  );
  return { $$type: "TargetTokenToCrossChainStrategy" as const, i: _i };
}

function loadTupleTargetTokenToCrossChainStrategy(source: TupleReader) {
  let _i = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserCrossChainStrategy(),
    source.readCellOpt()
  );
  return { $$type: "TargetTokenToCrossChainStrategy" as const, i: _i };
}

function storeTupleTargetTokenToCrossChainStrategy(
  source: TargetTokenToCrossChainStrategy
) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.i.size > 0
      ? beginCell()
          .storeDictDirect(
            source.i,
            Dictionary.Keys.BigInt(257),
            dictValueParserCrossChainStrategy()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserTargetTokenToCrossChainStrategy(): DictionaryValue<TargetTokenToCrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeTargetTokenToCrossChainStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTargetTokenToCrossChainStrategy(src.loadRef().beginParse());
    },
  };
}

export type FromTokenToTargetTokenToCrossChainStrategy = {
  $$type: "FromTokenToTargetTokenToCrossChainStrategy";
  i: Dictionary<bigint, TargetTokenToCrossChainStrategy>;
};

export function storeFromTokenToTargetTokenToCrossChainStrategy(
  src: FromTokenToTargetTokenToCrossChainStrategy
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(
      src.i,
      Dictionary.Keys.BigInt(257),
      dictValueParserTargetTokenToCrossChainStrategy()
    );
  };
}

export function loadFromTokenToTargetTokenToCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  let _i = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserTargetTokenToCrossChainStrategy(),
    sc_0
  );
  return {
    $$type: "FromTokenToTargetTokenToCrossChainStrategy" as const,
    i: _i,
  };
}

function loadTupleFromTokenToTargetTokenToCrossChainStrategy(
  source: TupleReader
) {
  let _i = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserTargetTokenToCrossChainStrategy(),
    source.readCellOpt()
  );
  return {
    $$type: "FromTokenToTargetTokenToCrossChainStrategy" as const,
    i: _i,
  };
}

function storeTupleFromTokenToTargetTokenToCrossChainStrategy(
  source: FromTokenToTargetTokenToCrossChainStrategy
) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.i.size > 0
      ? beginCell()
          .storeDictDirect(
            source.i,
            Dictionary.Keys.BigInt(257),
            dictValueParserTargetTokenToCrossChainStrategy()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserFromTokenToTargetTokenToCrossChainStrategy(): DictionaryValue<FromTokenToTargetTokenToCrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell()
          .store(storeFromTokenToTargetTokenToCrossChainStrategy(src))
          .endCell()
      );
    },
    parse: (src) => {
      return loadFromTokenToTargetTokenToCrossChainStrategy(
        src.loadRef().beginParse()
      );
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
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeUpdateProtocolFee(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateProtocolFee(src.loadRef().beginParse());
    },
  };
}

export type AddValidator = {
  $$type: "AddValidator";
  key: bigint;
  address: Address;
};

export function storeAddValidator(src: AddValidator) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2513894818, 32);
    b_0.storeInt(src.key, 257);
    b_0.storeAddress(src.address);
  };
}

export function loadAddValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2513894818) {
    throw Error("Invalid prefix");
  }
  let _key = sc_0.loadIntBig(257);
  let _address = sc_0.loadAddress();
  return { $$type: "AddValidator" as const, key: _key, address: _address };
}

function loadTupleAddValidator(source: TupleReader) {
  let _key = source.readBigNumber();
  let _address = source.readAddress();
  return { $$type: "AddValidator" as const, key: _key, address: _address };
}

function storeTupleAddValidator(source: AddValidator) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.key);
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserAddValidator(): DictionaryValue<AddValidator> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAddValidator(src)).endCell());
    },
    parse: (src) => {
      return loadAddValidator(src.loadRef().beginParse());
    },
  };
}

export type RemoveValidator = {
  $$type: "RemoveValidator";
  key: bigint;
};

export function storeRemoveValidator(src: RemoveValidator) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3282419170, 32);
    b_0.storeInt(src.key, 257);
  };
}

export function loadRemoveValidator(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3282419170) {
    throw Error("Invalid prefix");
  }
  let _key = sc_0.loadIntBig(257);
  return { $$type: "RemoveValidator" as const, key: _key };
}

function loadTupleRemoveValidator(source: TupleReader) {
  let _key = source.readBigNumber();
  return { $$type: "RemoveValidator" as const, key: _key };
}

function storeTupleRemoveValidator(source: RemoveValidator) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.key);
  return builder.build();
}

function dictValueParserRemoveValidator(): DictionaryValue<RemoveValidator> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRemoveValidator(src)).endCell());
    },
    parse: (src) => {
      return loadRemoveValidator(src.loadRef().beginParse());
    },
  };
}

export type SetIncomingStrategy = {
  $$type: "SetIncomingStrategy";
  from_chain: bigint;
  from_token: bigint;
  target_token: bigint;
  steps: Steps;
};

export function storeSetIncomingStrategy(src: SetIncomingStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1894737173, 32);
    b_0.storeInt(src.from_chain, 257);
    b_0.storeInt(src.from_token, 257);
    b_0.storeInt(src.target_token, 257);
    let b_1 = new Builder();
    b_1.store(storeSteps(src.steps));
    b_0.storeRef(b_1.endCell());
  };
}

export function loadSetIncomingStrategy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1894737173) {
    throw Error("Invalid prefix");
  }
  let _from_chain = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _target_token = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _steps = loadSteps(sc_1);
  return {
    $$type: "SetIncomingStrategy" as const,
    from_chain: _from_chain,
    from_token: _from_token,
    target_token: _target_token,
    steps: _steps,
  };
}

function loadTupleSetIncomingStrategy(source: TupleReader) {
  let _from_chain = source.readBigNumber();
  let _from_token = source.readBigNumber();
  let _target_token = source.readBigNumber();
  const _steps = loadTupleSteps(source.readTuple());
  return {
    $$type: "SetIncomingStrategy" as const,
    from_chain: _from_chain,
    from_token: _from_token,
    target_token: _target_token,
    steps: _steps,
  };
}

function storeTupleSetIncomingStrategy(source: SetIncomingStrategy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.from_chain);
  builder.writeNumber(source.from_token);
  builder.writeNumber(source.target_token);
  builder.writeTuple(storeTupleSteps(source.steps));
  return builder.build();
}

function dictValueParserSetIncomingStrategy(): DictionaryValue<SetIncomingStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeSetIncomingStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadSetIncomingStrategy(src.loadRef().beginParse());
    },
  };
}

export type SetCrossChainStrategy = {
  $$type: "SetCrossChainStrategy";
  target_chain: bigint;
  from_token: bigint;
  target_token: bigint;
  local_steps: Steps;
  foreign_steps: Steps;
};

export function storeSetCrossChainStrategy(src: SetCrossChainStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1825931216, 32);
    b_0.storeInt(src.target_chain, 257);
    b_0.storeInt(src.from_token, 257);
    b_0.storeInt(src.target_token, 257);
    let b_1 = new Builder();
    b_1.store(storeSteps(src.local_steps));
    b_1.store(storeSteps(src.foreign_steps));
    b_0.storeRef(b_1.endCell());
  };
}

export function loadSetCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1825931216) {
    throw Error("Invalid prefix");
  }
  let _target_chain = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _target_token = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _local_steps = loadSteps(sc_1);
  let _foreign_steps = loadSteps(sc_1);
  return {
    $$type: "SetCrossChainStrategy" as const,
    target_chain: _target_chain,
    from_token: _from_token,
    target_token: _target_token,
    local_steps: _local_steps,
    foreign_steps: _foreign_steps,
  };
}

function loadTupleSetCrossChainStrategy(source: TupleReader) {
  let _target_chain = source.readBigNumber();
  let _from_token = source.readBigNumber();
  let _target_token = source.readBigNumber();
  const _local_steps = loadTupleSteps(source.readTuple());
  const _foreign_steps = loadTupleSteps(source.readTuple());
  return {
    $$type: "SetCrossChainStrategy" as const,
    target_chain: _target_chain,
    from_token: _from_token,
    target_token: _target_token,
    local_steps: _local_steps,
    foreign_steps: _foreign_steps,
  };
}

function storeTupleSetCrossChainStrategy(source: SetCrossChainStrategy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.from_token);
  builder.writeNumber(source.target_token);
  builder.writeTuple(storeTupleSteps(source.local_steps));
  builder.writeTuple(storeTupleSteps(source.foreign_steps));
  return builder.build();
}

function dictValueParserSetCrossChainStrategy(): DictionaryValue<SetCrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeSetCrossChainStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadSetCrossChainStrategy(src.loadRef().beginParse());
    },
  };
}

export type RemoveInternalStrategy = {
  $$type: "RemoveInternalStrategy";
  from_chain: bigint;
  from_token: bigint;
  target_token: bigint;
};

export function storeRemoveInternalStrategy(src: RemoveInternalStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1891525520, 32);
    b_0.storeInt(src.from_chain, 257);
    b_0.storeInt(src.from_token, 257);
    b_0.storeInt(src.target_token, 257);
  };
}

export function loadRemoveInternalStrategy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1891525520) {
    throw Error("Invalid prefix");
  }
  let _from_chain = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _target_token = sc_0.loadIntBig(257);
  return {
    $$type: "RemoveInternalStrategy" as const,
    from_chain: _from_chain,
    from_token: _from_token,
    target_token: _target_token,
  };
}

function loadTupleRemoveInternalStrategy(source: TupleReader) {
  let _from_chain = source.readBigNumber();
  let _from_token = source.readBigNumber();
  let _target_token = source.readBigNumber();
  return {
    $$type: "RemoveInternalStrategy" as const,
    from_chain: _from_chain,
    from_token: _from_token,
    target_token: _target_token,
  };
}

function storeTupleRemoveInternalStrategy(source: RemoveInternalStrategy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.from_chain);
  builder.writeNumber(source.from_token);
  builder.writeNumber(source.target_token);
  return builder.build();
}

function dictValueParserRemoveInternalStrategy(): DictionaryValue<RemoveInternalStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeRemoveInternalStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRemoveInternalStrategy(src.loadRef().beginParse());
    },
  };
}

export type RemoveCrossChainStrategy = {
  $$type: "RemoveCrossChainStrategy";
  target_chain: bigint;
  from_token: bigint;
  target_token: bigint;
};

export function storeRemoveCrossChainStrategy(src: RemoveCrossChainStrategy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(207130758, 32);
    b_0.storeInt(src.target_chain, 257);
    b_0.storeInt(src.from_token, 257);
    b_0.storeInt(src.target_token, 257);
  };
}

export function loadRemoveCrossChainStrategy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 207130758) {
    throw Error("Invalid prefix");
  }
  let _target_chain = sc_0.loadIntBig(257);
  let _from_token = sc_0.loadIntBig(257);
  let _target_token = sc_0.loadIntBig(257);
  return {
    $$type: "RemoveCrossChainStrategy" as const,
    target_chain: _target_chain,
    from_token: _from_token,
    target_token: _target_token,
  };
}

function loadTupleRemoveCrossChainStrategy(source: TupleReader) {
  let _target_chain = source.readBigNumber();
  let _from_token = source.readBigNumber();
  let _target_token = source.readBigNumber();
  return {
    $$type: "RemoveCrossChainStrategy" as const,
    target_chain: _target_chain,
    from_token: _from_token,
    target_token: _target_token,
  };
}

function storeTupleRemoveCrossChainStrategy(source: RemoveCrossChainStrategy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.target_chain);
  builder.writeNumber(source.from_token);
  builder.writeNumber(source.target_token);
  return builder.build();
}

function dictValueParserRemoveCrossChainStrategy(): DictionaryValue<RemoveCrossChainStrategy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeRemoveCrossChainStrategy(src)).endCell()
      );
    },
    parse: (src) => {
      return loadRemoveCrossChainStrategy(src.loadRef().beginParse());
    },
  };
}

type Bridge_init_args = {
  $$type: "Bridge_init_args";
  chain_nonce: bigint;
  native_coin: bigint;
  base_uri: string;
  transfer_fee: bigint;
  protocol_fee: bigint;
  bootstrap_validator_key: bigint;
  bootstrap_validator_address: Address;
  ton_liquidity_pool: Address;
};

function initBridge_init_args(src: Bridge_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.chain_nonce, 257);
    b_0.storeInt(src.native_coin, 257);
    b_0.storeStringRefTail(src.base_uri);
    b_0.storeInt(src.transfer_fee, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.protocol_fee, 257);
    b_1.storeInt(src.bootstrap_validator_key, 257);
    b_1.storeAddress(src.bootstrap_validator_address);
    let b_2 = new Builder();
    b_2.storeAddress(src.ton_liquidity_pool);
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

async function Bridge_init(
  chain_nonce: bigint,
  native_coin: bigint,
  base_uri: string,
  transfer_fee: bigint,
  protocol_fee: bigint,
  bootstrap_validator_key: bigint,
  bootstrap_validator_address: Address,
  ton_liquidity_pool: Address
) {
  const __code = Cell.fromBase64(
    "te6ccgEC2AEAPo8AART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABETERIREREQVeDbPMntVMEEBQIBIIyNBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQc2LQnLqOuzDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU2zx/4CCCEHvdl966jwgw2zxsFts8f+AgghDrEm3LugYHCAkB8gEREgERE4EBAc8AAREQAYEBAc8AHoEBAc8ADMiBAQHPABuBAQHPABn0ABf0ABX0AFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0ABL0ABLKAMhQA88WyVjMEoEBAc8AEoEBAc8AA8j0ABSBAQHPABQXAfYxMhESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUgU1QKLPy9BET0z+BAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbrMKALLTHwGCEHvdl9668uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFFVFRRDMAH2NV8DERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERSBTVAos/L0ERPTP4EBAVRaAFJAQTP0DG+hlAHXADCSW23iggDERSFuFQR0jpww0x8BghDrEm3LuvLggdM/1NTU+gBVQGwV2zx/4CCCEPpdRdS6jwgw2zxsGts8f+AgghBquMBBuhgZGhsC9PL0ggD3tfhBbyQTXwMCIG7y0IAooBK+8vQRE6QRE9TU1DAi0NP/MFYRgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEzjyFus/L0IG7y0IBvKRAoXwiC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gQEBzwAByIEBAc8AWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADKQGSIG6VMFn0WjCUQTP0FeIRERESEREREBERERAPERAPEO8NDhC8EKsQmhCJEHgQZxBWEEUQNEEwcIBA+EFvJBAjXwN/QTNtbW3bPIkAtCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzMkBzAPUXw9sMRETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAds8gU1QKLPy9PhD+ChWGds8XIg1KwHWcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgKERgKCREXCQgRFggHESAHBhEfBgURHgUEER0EAxEcAwIRGwIBERoBERksArjIVaCCEBcY2YtQDMsfBxBqEFkQSEoTUJjbPPQAAsiBAQHPAMv/EoEBAc8AyQHMyRA/cFqAQAIBERMBERJ/BkVV2zwHERIHBhERBgUREAUQTxA+TRtQykiXRWRQAzaJAH7THwGCEIlperC68uCB0z/TP/oAgQEB1wDU1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgXFhUUQzAC9BESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIERMIBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREWgVrfERjbPPhBbyQQI18DxwUBERgB8vSCAMXiVhQvuvL0VhvQ0/8wVhvQMzQC9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQxzEE2oIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG6jpgw0x8BghBq33iBuvLggYEBAdcAATHbPH/gIIIQldb9orpPUFFSAvZfD2wxERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUB2zyBAQEgEEoTAhEVAgERFgEhbpVbWfRaMJjIAc8AQTP0QuKIMgFwERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeQgQVxBGEDVEA3CAQPhBbyQQI18Df0EzbW1t2zyJAZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ig1A/7T/zBWFgFWFgFWFgERIVYgViBWIMhVYNs8yfkAERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDERgDAgERGgERGds8ERIRFRESERERFBERERARExEQDxESDw4REQ4NERANNjc4AKIC0PQEMG0BgW9fAYAQ9A9vofLghwGBb18iAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkAcoIQiWl6sFAIyx8Wyz8Uyz9Y+gKBAQHPAMzMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgCYcAGOPSGBAQEiWfQNb6GSMG3fIG6SMG2c0NQB0AHT/1lsEm8C4iBu8tCAbyIxJ4EBASJZ9AxvoZIwbd8xbrORpN7kMYIAt1YyI77y9AEeEM9VKxIBERcBERtWGFYXOQP6ERQRFxEUERMRFhETERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRFwIBERYBERVWF9s8cAGK5FtXE1cTVxMPERIPDhERDg0REA1VLAURFAU6OzwB8oEBAVYQQBRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oIAh2khbrPy9CBu8tCAbyGBAQFYWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBON4hbrPy9CBu8tCAbyGBAQFYWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuI9AnqBAQFUUgBSMEEz9AxvoZQB1wAwkltt4iBu8tCAIMAN4w8REhEUERIRERETEREREBESERAPEREPDhEQDlUdPj8BlAQREwQDERcDAhEWAgERGAERFchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAwREgwLERELChEQChCfEI4QfRBsVVVFBEATTgAgggDpDiFus/L0IG7y0IBvIgPGMBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zxWGAG6johWFlYWVhnbPOMOpEhAA5AgwASPQcAHjymBAQEhpFMTVSBBM/QMb6GUAdcAMJJbbeIgbrOXIG7y0IDACJIwcOLjD44RpBEUARETARESARERAREQVdHi4w1CQ0QD9lYWVhZWGYEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKRAoXwhtcMiNCJVbmxvY2tlZCBmcm9tIEVtbWV0LmZpbmFuY2UgQnJpZGdlgzxbJ0FMVBQdVMFVQyFVg2zzJJ39wUAQDbW3bPEtBiQDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAbAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYWVhZWGds8RQGwERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWFlYWVhnbPEgBrjAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYWVhZWGUoCwIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKVB4XweBWTQhbrPy9IIA9FwibrPy9AEgbvLQgAEgbvLQgMiCCfODXQHLH3AByz8j+gL4KEtGAdwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZxAcsAyIIQJZOFYQHLKVADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W+Cgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb4KEcBwCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshw+gIlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WcPoCcAHLAHD6AnABywBwAcsPcAHLAMkBzMlYzMlDMEkCgoEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEQISFus/L0IG7y0IBvKRhfCIFZNCFus/L0IG7y0IDIyUMwS0kBlMhVIIIQj5FIIVAEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCIW6zlX8BygDMlHAyygDiyYBAf3BQBANtbds8iQOkgQEBVhECWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwniggC/zCFus/L0IG7y0IBvKRB4Xwj4KG1wyMnQEDUQRshVUNs8yYIQBMS0AH9wUAQDbW3bPEtMiQHm1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB4EBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAU0AyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYA0iDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHUMNAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIxEEkQSBBHEEYQRQBWUFbL/1AD+gLMzMs/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHUwL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHVAL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxDHVQTgjrgw0x8BghCV1v2iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghDDpb3iuo6YMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/4CCCEHDvZRW64wIgghBs1X/QulZXWFkC5l8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPBESERMREhERERIREREQEREREA8REA9VDjWIcQL+Xw9sMRETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkIERQIBxEUBwYRFAYFERQFBBEUBAMRFAMCERQCAREUAds8NhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGdVBIhxAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ42iHEC9FYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUERIRJxESERERJhERERARJREQDxEkDw4RIw4NESINDBEhDAsRIAsKER8KCREeCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBERYBERXbPFcQx1oC9FYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQx1wBaDDTHwGCEHDvZRW68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkyECUQJEMAbBXbPH9eBP6OvzDTHwGCEGzVf9C68uCBgQEB1wCBAQHXAIEBAdcA1AHQ9ASBAQHXAFkC9ASBAQHXAFkyEEcQRhBFQwBsF9s8f+AgghAMWJCGuo6kMNMfAYIQDFiQhrry4IGBAQHXAIEBAdcAgQEB1wBVIGwT2zx/4CCCEHC+Y5C64wIgwAAiY2RlZgL6Xw9sMRETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAds8MYEBAQIBERMBERQgbpUwWfRaMJRBM/QU4hERpCCqAHOpBKSIWwF0ERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QQQDcIBA+EFvJBAjXwN/QTNtbW3bPIkC9F8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPDESgQEBARETbSBulTBZ9FowlEEz9BTiAaUgqgBzqQSkiF0BShERERIREREQEREREA8REA9VDnCAQPhBbyQQI18Df0EzbW1t2zyJAvRWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWFxESESoREhERESkREREQESgREA8RJw8OESYODRElDQwRJAwLESMLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREY2zxXEMdfAvhfD2wxERMRGBETERIRFxESERERFhERERARFREQDxEUDw4RGA4NERcNDBEWDAsRFQsKERQKCREYCQgRFwgHERYHBhEVBgURFAUEERgEAxEXAwIRFgIBERUB2zwREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMiGACOgsREAsQr1VJ2zxwgED4QW8kECNfA39BM21tbds8YYkB9FYRgQEBJln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hIIEBASZZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4iBulDBtbwHeIG7y0IBvIQOBAQEDyFkC9ACBAQHPAMkUIG6VMFn0WjCUQTP0FeKBAQEBYgBkyAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwC9FYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZERIRLBESERERKxERERARKhEQDxEpDw4RKA4NEScNDBEmDAsRJQsKESQKCREjCQgRIggHESEHBhEgBgURHwUEER4EAxEdAwIRHAIBERsBERrbPFcQx2cC9FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQx2sBSDDTHwGCEHC+Y5C68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8f24D/NdJwSGwklt/4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEAph21m6jrYw0x8BghAKYdtZuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLgIHN0dQL4Xw9sMRETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwRGgwLERkLChEYCgkRFwkIERYIBxEVBwYRFAYFERoFBBEZBAMRGAMCERcCAREWAds8ERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDIhoAk4LERIL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gQEBzwDJEDwSIG6VMFn0WjCUQTP0FeIJfwEKkTDjDXCAAvApERERExERXj8OERIODRETDQwREgwLERMLChESCgkREwkIERIIBxETBwYREgYFERMFBBESBAMREwMCERICARETARESgQEBERTbPAIRFAIBERUBWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuKCANMHIW6z8vTWfQCSIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERAREhEQDxERDw4REA5VHQPyERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWE9s82zwpgQEBVhVZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4pyIfwDeIG7y0IBvIoEBCwERF3BxIW6VW1n0WTCYyAHPAEEz9EHigQEBERbIWQL0AIEBAc8AyRA6AhEVAgERFAEgbpUwWfRaMJRBM/QV4hEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASA/75ASCC8DoSMt2ZofO05Yb/gnbnxTo15f1nGPd8X8XtgVhHrd0/uo6GMNs8f9sx4CCC8O+zR5Z2E25EJL1osBYpwm6YIUOgZFeUIeYSl8Fo53GRuo6GMNs8f9sx4ILwIo/Oko+sVEhgID3UcqsOBb5duYDEKWuN840Lar59ak+6gYKDAvRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEMqEAfCCAOPAKLPy9FYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQKFARCOhds8f9sx4IYCUl8PbDHbPIFaARERwgABEREB8vT4QW8kECNfA3CDBn9VIG1t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0FYSVhJWElYSVhJWElYSERIRJRESERERJBERERARIxEQDxEiDw4RIQ4NESANDBEfDAsRHgsKER0KCREcCQgRGwgHERoHBhEZBgURGAUEERcEAxEWAwIRFQIBERQBERPbPFcQXw9sMVYU0dIARILwB8+ZABPAtjytXqtP1eEWCMGmj0gwtwEPOdXS0hiMcu8C/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhLV0wL8VhJWElYSVhJWElYSVhIREhElERIREREkEREREBEjERAPESIPDhEhDg0RIA0MER8MCxEeCwoRHQoJERwJCBEbCAcRGgcGERkGBREYBQQRFwQDERYDAhEVAgERFAERE9s8VxBfD2wxERMRFBETERIRExESEREREhERERAREREQ1tQB2g8REA9VDiuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4gnVAuwwbYEBCyJ/cSFulVtZ9FkwmMgBzwBBM/RB4hESERUREhERERQREREQERMREA8RFQ8OERQODRETDQwRFQwLERQLChETCgkRFQkIERQIBxETBwYRFQYFERQFBBETBAMRFQMCERQCARETAREV2zwBERYBbwKBAQEh1tcAAnAAqCBukjBtjhIgbvLQgG8iyFkC9ACBAQHPAMniECtWFgEgbpUwWfRaMJRBM/QV4hESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrQxVKA=="
  );
  const __system = Cell.fromBase64(
    "te6cckICAR8AAQAATtAAAAEBwAABAgEgAAIAJwIBIAADAB8BBbvfmAAEART/APSkE/S88sgLAAUCAWIABgAQA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCABsABwAPBPYBkjB/4HAh10nCH5UwINcLH94gghAV5M5Yuo5BMNMfAYIQFeTOWLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAiob4QW8kECNfAxTHBRPy9H/gIIIQIVLUjLrjAiCCEHvdl966jwgw2zxsFts8f+AACABXAAkACwCCMNMfAYIQIVLUjLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTOBbTL4QW8kECNfA1IwxwXy9H8C7PhBbyQQThA9TLpUfctUfctUfctWFxA3XwcyVVD4Q/goEts8AYEmCwJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFAHxwUW8vRVAxBOVZMARAAKApw2NjY2UaqhjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEJccFs48YSjAVgEJURXzIVVDbPMkScH8EQTNtbds8kzpfBeIANADOA/AgghCJtx0Juo86MNs8bBb4QW8kEE4QPUy6VH3LVH3LVH3LVhdfCoF1bSTy9IFFbfhBbyQQI18DUkDHBfL0EE5Vk9s8f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAADAANALcAxtMfAYIQibcdCbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDSAAGR1JJtAeL6AFFVFRRDMAP0MjU1NTUQWRBIEDdGmPhD+CgS2zxRaKBTFnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcH+AQCL4KBUQThA/AgEREAENECPIVVDbPMkQaxBZEEoARAAxAA4BGhA4QAcQRhBF2zwEUDMAzgCoyPhDAcx/AcoAVUBQVPoCEsoAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMye1UAgEgABEAEgIRviju2ebZ42KMABsA/AIBIAATABgCAWYAFAAWAk2tvJBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqCbZ42KMAAGwAVAZD4Q/goEts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgARAIRrxbtnm2eNirAABsAFwFWVHQyVHQ3VHmG+CgQXhBNEDxLoPhD+CgS2zxsUjAQSBA3RlAQiRB4EGcQVgBEAgHHABkAGgAQqr7tRNDSAAECEKlO2zzbPGxRABsAHgHC7UTQ1AH4Y9IAAY5J+gDSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUVUBsFeD4KNcLCoMJuvLgiQAcAZD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FUgA9FY2zwAHQAKcAN/QxMAAiEBBbr1+AAgART/APSkE/S88sgLACECAWIAIgAmAuTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AygDJ7VQAIwAkAdztRNDUAfhj0gABjiv6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gBVIGwT4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPAEcAp4BkjB/4HAh10nCH5UwINcLH94gghAXGNmLuuMCghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwACUAtwPsMNMfAYIQFxjZi7ry4IHbPAf0BNQB0IEBAdcA0/+BAQHXADAQOxA0bBuCAK9QDLMc8vR/C8hVoIIQOL6XD1AMyx8LghAXGNmLUAzLHwcQahBZEEhKE1CY2zz0AALIgQEBzwDL/xKBAQHPAMkBzMn4QgF/bds8fwBxAHYAtwARoYV92omhpAADAgFYACgARgEFtfNwACkBFP8A9KQT9LzyyAsAKgIBYgArAD4DetAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUS2zzy4IIAQAAsAD0C7gGOW4Ag1yFwIddJwh+VMCDXCx/eIIIQF41FGbqOGjDTHwGCEBeNRRm68uCB0z/6AFlsEjEToAJ/4IIQe92X3rqOGdMfAYIQe92X3rry4IHTP/oAWWwSMROgAn/gMH/gcCHXScIflTAg1wsf3iCCEA+KfqW64wIgAC0AMgIQMNs8bBfbPH8ALgAvAMbTHwGCEA+KfqW68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeL6AFFmFhUUQzAC0PhBbyRR2aGBMzEhwv/y9EDLVHO8VhBUftxUftwuEJpfCiKBbLcCxwXy9FRzvFYQVH7cVH7cLhVfBXEywgCSMHLeVBQyggCRQQbbPBKoghAF9eEAoIIK+vCAoLzy9E3LEDpHiRA2XkABADoAMAPeMjY2NjYQOEdl+ENREts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGHBQh3+AQFRH3hAjyFVQ2zzJEEkQOEAXEEYQRds8AEQAMQDOAKqCEBeNRRlQB8sfFcs/UAP6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAc8WBNSCEFlfB7y6j9kw2zxsFvhBbyRRyKGCAOvCIcL/8vRAulRzq1R/y1R9yy0QiV8JIoIAt8gCxwXy9Ey6EDlecFA0MjU1NTVQBHCAQH8pRxNQaAHIVVDbPMkkVTAUQzBtbds8f+CCEBeNRRm6ADMANADOADUAhNMfAYIQWV8HvLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeL6AFFVFRRDMACqghB73ZfeUAfLHxXLP1AD+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgHPFgIYjwfbPGwW2zx/4DBwADYANwCy0x8BghAXjUUZuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzABNvhBbyRRyKCBcc0hwv/y9EC6VHOrVH/LVH3LLQA4At4QN18HMlMgxwWzjtZVMPhDURLbPAGBCPgCcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhQBccFFPL0WJFb4lRzq1R/y1R9yy0ARAA5A3QVXwX4J28QI6GCCvrwgGa2CKGCCvrwgKBSMKEhwgCOh1Ux2zxYoKGSbFHiJsIA4wAQPUywEEpecV4xADoAOwA8AGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAHGVSBUdLxWEFR+3FR+3DI1NTU1IcIAjsYBcVBUcATIVTCCEHNi0JxQBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFsklVTAUQzBtbds8kl8F4lUCAM4BrjRbMmwzM40IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCHHBbOTIsIAkXDijpxwcgPIAYIQ1TJ221jLH8s/yUFAExAkECNtbds8kl8D4gDOAJ7I+EMBzH8BygBVIFr6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UAgEgAD8ARQIRv9gW2ebZ42GkAEAAQwG67UTQ1AH4Y9IAAY5F+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT4Pgo1wsKgwm68uCJAEEBivpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPABCAARwWQEsVHIQVHVDVBdh+ENREts8bDIwEDZFQABEANoC0PQEMG0BggDPmwGAEPQPb6Hy4IcBggDPmyICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJABG+FfdqJoaQAAwBBbd8sABHART/APSkE/S88sgLAEgCAWIASQDSA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABETERIREREQVeDbPMntVAEIAEoA0ATu7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEHNi0Jy6jrsw0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFNs8f+AgghB73Zfeuo8IMNs8bBbbPH/gIIIQ6xJty7oASwBXAFgAWwH2MTIREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFIFNUCiz8vQRE9M/gQEBVFoAUkBBM/QMb6GUAdcAMJJbbeKCAMRFIW6zAEwC9PL0ggD3tfhBbyQTXwMCIG7y0IAooBK+8vQRE6QRE9TU1DAi0NP/MFYRgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oEzjyFus/L0IG7y0IBvKRAoXwiCAO1I+EFvJBAjXwNYxwXy9CHQ0/8wERQRFxEUERMRFhETAIoATQPeERIRFRESERERFxERERARFhEQDxEVDw4RFw4NERYNDBEVDAsRFwsKERYKCREVCQgRFwgHERYHBhEVBgURFwUEERYEAxEVAwIRGAJWF1lWGts8BBEXBAMREwNWEgMCERYCAREVAREXWhUUyFVQ2zzJAE4AXwBWA/YRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAgERFQFWFgERFts8W3ABiuRbVxNXExEQERIREA8REQ8OERAOEN8ATwBRAFUByIEBAVRPFFn0DW+hkjBt3yBukjBtl9D0BAExbwHiggCBZCFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oEbGCFus/L0IG7y0IBvIYEBAVhZ9A1voZIwbd8AUABgIG6SMG2OGND0BIEBAdcAWQL0BIEBAdcAWRAkbBRvBOKCAKYeIW6z8vQgbvLQgG8kAZ6BAQFUUgBSMEEz9AxvoZQB1wAwkltt4iBu8tCAwAaOEaQRFAEREwEREgEREQEREFXR4w0REhEUERIRERETEREREBESERAPEREPDhEQDlUdAFIBrBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUVhVWF9s8AFMD8IEBAVYQAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4iBu8tCAbykYXwiCAMBUIW6z8vRwgEAiIG7y0IAjIG7y0IBtJMiNCJVbmxvY2tlZCBmcm9tIEVtbWV0LmZpbmFuY2UgQnJpZGdlgzxbJ0CEQaVVQyFVg2zzJAgCKAH8AVAEcIG7y0IBDMH9ENG1t2zwAzgAEVRwAVMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AA0REg0MEREMCxEQCxCvVUkQNACy0x8BghB73ZfeuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBRVRUUQzAB9jVfAxESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUgU1QKLPy9BET0z+BAQFUWgBSQEEz9AxvoZQB1wAwkltt4oIAxEUhbgBZA/iz8vSCAPe1+EFvJBNfAwIgbvLQgCigEr7y9BETpBET1CHQ0/8wgQEBVhECWfQNb6GSMG3fIG6SMG2Oh9DbPGwZbwnigTOPIW6z8vSCAMHuASBu8tCAbykQeF8I+EFvJBAjXwPHBfL01NQwBBEXBBNWFVAzWhUUyFVQ2zzJAIoAXwBaAFTIgljAAAAAAAAAAAAAAAABActnzMlw+wAREBESERAPEREPDhEQDhDfVRwEdI6cMNMfAYIQ6xJty7ry4IHTP9TU1PoAVUBsFds8f+AgghD6XUXUuo8IMNs8bBrbPH/gIIIQarjAQboAXABhAGMAZgHuERIRFxESERERFhERERARFREQDxEUDw4REw4NERcNDBEWDAsRFQsKERQKCRETCQgRFwgHERYHBhEVBgURFAUEERMEAxEXAwIRFgIBERUBERSBTVAos/L0ERKkVhQDAhEXAiFWFQIBERgBERpaFRSBAQFTDAMRGQEAXQH8QTP0DG+hlAHXADCSW23iggDERSFus/L0ggD3tfhBbyQTXwMCIG7y0IBWGaApoBK+8vQRExEXERMREhEXERIREREXEREREBEXERAPERcPDhEXDg0RFw0MERcMCxEXCwoRFwoJERcJCBEXCAcRFwcGERcGBREXBQQRFwQDERkDAF4D/gIRGAIBERQBERaBQ174QW8kE18DIr7y9BEQVhCgUhAREYBBf1UgbW1t2zwFERYFBBEYBAMRFwMCERMCAREVAREUyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsADBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIFgQFUDMAzgBfAGAALIIQY8SfV1AHyx8Vy/9QA/oCzMzMyz8ABEcXAcrTHwGCEPpdRdS68uCBgQEB1wDUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB4EBAdcA1AHQgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQBiAPb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0CDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRBaEFkQWBBXEFYC9FYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcVhxWHFYcERIRLxESERERLhERERARLREQDxEsDw4RKw4NESoNDBEpDAsRKAsKEScKCREmCQgRJQgHESQHBhEjBgURIgUEESEEAxEgAwIRHwIBER4BER3bPFcQAR4AZAL4Xw9sMRETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAds8ERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEWDADMAGUC0AsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPUy6EIkQeBBnEDUQNBB4EGhJmYEBAQoQOBA3EDUQNMhVgNs8yQMREAMgbpUwWfRaMJRBM/QV4g1wgED4QW8kECNfA39BM21tbds8AGkAzgSujpUw0x8BghBquMBBuvLggdP/ATHbPH/gIIIQFxjZi7qPLDDTHwGCEBcY2Yu68uCB2zwH9ATUAdCBAQHXANP/gQEB1wAwEDsQNGwb2zx/4CCCEDi+lw+6AGcAcQBsAHAC9FYTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRFgIBERUBERTbPFcQAR4AaAP0Xw9sMRETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkIERQIBxEUBwYRFAYFERQFBBEUBAMRFAMCERQCAREUAds8gQEBbSBukjBtjo0gbvLQgG8pyFWA2zzJ4hA/EgERFQEAzABpAGsB8shQCc8WyVAJzFAGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSyweBAQHPAAHIgQEBzwBYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMAagC0IG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLIWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyQHMyQHMAZIgbpUwWfRaMJRBM/QV4hERERIREREQEREREA8REA8Q7w0OELwQqxCaEIkQeBBnEFYQRRA0QTBwgED4QW8kECNfA39BM21tbds8AM4C9FYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdVh1WHVYdERIRMBESERERLxERERARLhEQDxEtDw4RLA4NESsNDBEqDAsRKQsKESgKCREnCQgRJggHESUHBhEkBgURIwUEESIEAxEhAwIRIAIBER8BER7bPFcQARcAbQPUXw9sMRETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAds8gU1QKLPy9PhD+ChWGds8XADMAHQAbgHWcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgKERgKCREXCQgRFggHESAHBhEfBgURHgUEER0EAxEcAwIRGwIBERoBERkAbwK4yFWgghAXGNmLUAzLHwcQahBZEEhKE1CY2zz0AALIgQEBzwDL/xKBAQHPAMkBzMkQP3BagEACARETARESfwZFVds8BxESBwYREQYFERAFEE8QPk0bUMpIl0VkUAMAdgDOBP6POTDTHwGCEDi+lw+68uCB0x8BghAXGNmLuvLggds8B/QE1AHQgQEB1wDT/4EBAdcAMBA7EDRsG9s8f+AgghBJ891+uo6YMNMfAYIQSfPdfrry4IHTP9P/WWwS2zx/4CCCENUydtu6jhQw0x8BghDVMnbbuvLggdM/ATEwf+AgAHEAcgCPAJIAftMfAYIQiWl6sLry4IHTP9M/+gCBAQHXANTU+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBcWFRRDMAL0ERIRHRESERERHBERERARGxEQDxEaDw4RGQ4NERgNDBEXDAsRFgsKERUKCREUCQgREwgHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERaBWt8RGNs8+EFvJBAjXwPHBQERGAHy9IIAxeJWFC+68vRWG9DT/zBWG9AAcwB1AZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoH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+gIhbrOVfwHKAMyUcDLKAOLJgEB/cFAEA21t2zwAzgGuMBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUVhZWFlYZAIkDpIEBAVYRAln0DW+hkjBt3yBukjBtjofQ2zxsGW8J4oIAv8whbrPy9CBu8tCAbykQeF8I+ChtcMjJ0BA1EEbIVVDbPMmCEATEtAB/cFAEA21t2zwAigCMAM4B5tQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0weBAQHXANQB0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEAiwDSINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdQw0CDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4jEQSRBIEEcQRhBFAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAZQEERMEAxEXAwIRFgIBERgBERXIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAMERIMCxERCwoREAoQnxCOEH0QbFVVRQRAEwCOAFZQVsv/UAP6AszMyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAvRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEAEeAJAC9l8PbDERExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQHbPIEBASAQShMCERUCAREWASFulVtZ9FowmMgBzwBBM/RC4gDMAJEBcBEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkIEFcQRhA1RANwgED4QW8kECNfA39BM21tbds8AM4E2oIQM5DTaLqOmDDTHwGCEDOQ02i68uCBgQEB1wABMds8f+AgghC0uwq1uo6VMNMfAYIQtLsKtbry4IHUAdAx2zx/4CCCEGrfeIG6jpgw0x8BghBq33iBuvLggYEBAdcAATHbPH/gIIIQldb9oroAkwCVAJcAmQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCUAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ41AMwAtQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCWAv5fD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zw2EREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZ1UEAMwAtQL0VhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEWAgERFQERFNs8VxABHgCYAuZfD2wxERMRFBETERIRFBESERERFBERERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCQgRFAgHERQHBhEUBgURFAUEERQEAxEUAwIRFAIBERQB2zwREhETERIRERESEREREBERERAPERAPVQ42AMwAtQTgjrgw0x8BghCV1v2iuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AgghDDpb3iuo6YMNMfAYIQw6W94rry4IGBAQHXAAEx2zx/4CCCEHDvZRW64wIgghBs1X/QugCaAJ0AoACmAvRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFFYUVhRWFBESEScREhERESYREREQESUREA8RJA8OESMODREiDQwRIQwLESALChEfCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREWAREV2zxXEAEeAJsC+l8PbDERExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQHbPDGBAQECARETAREUIG6VMFn0WjCUQTP0FOIREaQgqgBzqQSkAMwAnAF0ERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QQQDcIBA+EFvJBAjXwN/QTNtbW3bPADOAvRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCERYCAREVAREU2zxXEAEeAJ4C9F8PbDERExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJCBEUCAcRFAcGERQGBREUBQQRFAQDERQDAhEUAgERFAHbPDESgQEBARETbSBulTBZ9FowlEEz9BTiAaUgqgBzqQSkAMwAnwFKEREREhERERAREREQDxEQD1UOcIBA+EFvJBAjXwN/QTNtbW3bPADOAWgw0x8BghBw72UVuvLggYEBAdcAgQEB1wCBAQHXANQB0PQEgQEB1wBZMhAlECRDAGwV2zx/AKEC9FYXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXVhdWF1YXERIRKhESERERKRERERARKBEQDxEnDw4RJg4NESUNDBEkDAsRIwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPFcQAR4AogL4Xw9sMRETERgRExESERcREhERERYREREQERUREA8RFA8OERgODREXDQwRFgwLERULChEUCgkRGAkIERcIBxEWBwYRFQYFERQFBBEYBAMRFwMCERYCAREVAds8ERIRFxESERERFhERERARFREQDxEUDw4REw4NERINDBERDADMAKMCOgsREAsQr1VJ2zxwgED4QW8kECNfA39BM21tbds8AKQAzgH0VhGBAQEmWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBJln0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hA4EBAQPIWQL0AIEBAc8AyRQgbpUwWfRaMJRBM/QV4oEBAQEApQBkyAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwE/o6/MNMfAYIQbNV/0Lry4IGBAQHXAIEBAdcAgQEB1wDUAdD0BIEBAdcAWQL0BIEBAdcAWTIQRxBGEEVDAGwX2zx/4CCCEAxYkIa6jqQw0x8BghAMWJCGuvLggYEBAdcAgQEB1wCBAQHXAFUgbBPbPH/gIIIQcL5jkLrjAiDAACIApwCsALAAtgL0VhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhlWGVYZVhkREhEsERIRERErEREREBEqERAPESkPDhEoDg0RJw0MESYMCxElCwoRJAoJESMJCBEiCAcRIQcGESAGBREfBQQRHgQDER0DAhEcAgERGwERGts8VxABHgCoAvhfD2wxERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBgURGgUEERkEAxEYAwIRFwIBERYB2zwREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMAMwAqQJOCxESCwoREQoJERAJEI8QflVm2zxwgED4QW8kECNfA39BM21tbds8AKoAzgHuVhKBAQEoWfQNb6GSMG3fIG6SMG2X0PQEATFvAeIgbpQwbW8B3iBu8tCAbyEggQEBKFn0DW+hkjBt3yBukjBtl9D0BAExbwHiIG6UMG1vAd4gbvLQgG8hVSKBAQEGyFUwRDQC9ACBAQHPAAIC9ACBAQHPAMlDMBQAqwCIIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPhIgbpUwWfRaMJRBM/QV4gsC9FYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVERIRKBESERERJxERERARJhEQDxElDw4RJA4NESMNDBEiDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBERbbPFcQAR4ArQP8Xw9sMRETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAds8ERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM9VK9s8AMwArgC1AbYugQEBJFn0DW+hkjBt3yBukjBtl9D0BAExbwHiggCBZCFus/L0IG7y0IBvISCBAQEkWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBGxghbrPy9CBu8tCAbyGBAQFtAK8A2iBukjBtjh4gbvLQgG8kyFUwRDQC9ACBAQHPAAIC9ACBAQHPAMniQTAUIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPhIgbpUwWfRaMJRBM/QV4gsBSDDTHwGCEHC+Y5C68uCBgQEB1wCBAQHXAIEBAdcAVSBsE9s8fwCxAvRWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFVYVVhVWFRESESgREhEREScREREQESYREA8RJQ8OESQODREjDQwRIgwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREW2zxXEAEeALID/F8PbDERExEWERMREhEVERIREREUEREREBEWERAPERUPDhEUDg0RFg0MERUMCxEUCwoRFgoJERUJCBEUCAcRFgcGERUGBREUBQQRFgQDERUDAhEUAgERFgHbPBESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSvbPADMALMAtQHuL4EBASRZ9A1voZIwbd8gbpIwbZfQ9AQBMW8B4oEtfyFus/L0IG7y0IBvISCBAQEkWfQNb6GSMG3fIG6SMG2X0PQEATFvAeKBeewhbrPy9CBu8tCAbyGBAQFtIG6SMG2OEiBu8tCAbyLIWQL0AIEBAc8AyeJBMBQAtACIIG6VMFn0WjCUQTP0FeKBAQEByAEB9ADJQTAgbpUwWfRaMJRBM/QV4oEBAQHIAQH0AMkQPxIgbpUwWfRaMJRBM/QV4gwBJnCAQPhBbyQQI18Df0EzbW1t2zwAzgP810nBIbCSW3/gIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQCmHbWbqOtjDTHwGCEAph21m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEuAgALcAuAC7ATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPADOAuYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFNs8ERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zx/AL0AuQPyERIRFBESERERExERERARFBEQDxETDw4RFA4NERMNDBEUDAsREwsKERQKCRETCQgRFAgHERMHBhEUBgUREwUEERQEAxETAwIRFAIBERMBERRWE9s82zwpgQEBVhVZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4gDfAMwAugDeIG7y0IBvIoEBCwERF39xIW6VW1n0WTCYyAHPAEEz9EHigQEBERbIWQL0AIEBAc8AyRA6AhEVAgERFAEgbpUwWfRaMJRBM/QV4hEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKCRBoEFcQRhA1RDASBKyCEFE+8166jrYw0x8BghBRPvNeuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBLgIIIQFzK+IbrjAiCCECT6R8m64wLAAAC8AL8AwgDDAuYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFNs8ERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zx/AL0AwALwKRERERMREV4/DhESDg0REw0MERIMCxETCwoREgoJERMJCBESCAcREwcGERIGBRETBQQREgQDERMDAhESAgEREwEREoEBAREU2zwCERQCAREVAVn0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiggDTByFus/L0ARwAvgCSIG7y0IBvIjCBAQv4QW8kECNfA3FBM/QKb6GUAdcAMJJbbeKCANMHIW6zmAEgbvLQgMD/kjFw4vL0ERAREhEQDxERDw4REA5VHQGQMNMfAYIQFzK+Ibry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBKBHwv4QW8kECNfAyLHBfL02zx/AMAD8hESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREUVhPbPNs8KYEBAVYVWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIA3wDMAMEA3iBu8tCAbyKBAQsBERdwcSFulVtZ9FkwmMgBzwBBM/RB4oEBAREWyFkC9ACBAQHPAMkQOgIRFQIBERQBIG6VMFn0WjCUQTP0FeIREBESERAPEREPDhEQDhDfEM4QvRCsEJsQigkQaBBXEEYQNUQwEgDeMNMfAYIQJPpHybry4IGBAQHXAIEBAdcAWWwSK4EBASNZ9A1voZIwbd8gbpIwbZ3Q9ASBAQHXAFlsEm8C4oFU5SFus/L0IG7y0IBvIjCBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4gl/AQqRMOMNcADEA/75ASCC8DoSMt2ZofO05Yb/gnbnxTo15f1nGPd8X8XtgVhHrd0/uo6GMNs8f9sx4CCC8O+zR5Z2E25EJL1osBYpwm6YIUOgZFeUIeYSl8Fo53GRuo6GMNs8f9sx4ILwIo/Oko+sVEhgID3UcqsOBb5duYDEKWuN840Lar59ak+6AMUAxwDJAvRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEAEQAMYCUl8PbDHbPIFaARERwgABEREB8vT4QW8kECNfA3CDBn9VIG1tbds8cBEQAMwAzgHwggDjwCiz8vRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAMgDSgERFAERE9s8VxBfD2wx2zx/OHCAQPhBbyQQI18Df0EzbW1t2zwBHgDMAM4BEI6F2zx/2zHgAMoB9oF0+Ciz8vRWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUAQDLA0IRE9s8VxBfD2wx2zxwOHCAQPhBbyQQI18Df0EzbW1t2zwBHgDMAM4C8oIAxO34QW8kECNfAxEUERURFBETERURExESERUREhERERUREREQERUREA8RFQ8OERUODREVDQwRFQwLERULChEVCgkRFQkIERUIBxEVBwYRFQYFERUFBBEVBAMRFQMCERUCAREV2zwBERQB8vQRERESEREREBERERAA1wDNAAwPERAPVQ4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAAM8AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB8gEREgERE4EBAc8AAREQAYEBAc8AHoEBAc8ADMiBAQHPABuBAQHPABn0ABf0ABX0AFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0ABL0ABLK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ElYSVhJWElYSVhJWElYSVhIBGwESAtxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDH4QW8kECNfAwEcARMC/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEUAtxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDH4QW8kECNfAwEXARUC/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEWAtBWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDFWFAEXARgARILwB8+ZABPAtjytXqtP1eEWCMGmj0gwtwEPOdXS0hiMcu8C/iuBAQEjWfQNb6GSMG3fIG6SMG2d0PQEgQEB1wBZbBJvAuIgbuMAIG7y0IBvIoEBC1ADf3EhbpVbWfRZMJjIAc8AQTP0QeKBAQECyFkC9ACBAQHPAMkQPBIgbpUwWfRaMJRBM/QV4glWElYSVhJWElYSVhJWElYSVhJWElYSVhIBGwEZAvxWElYSVhJWElYSVhJWEhESESUREhERESQREREQESMREA8RIg8OESEODREgDQwRHwwLER4LChEdCgkRHAkIERsIBxEaBwYRGQYFERgFBBEXBAMRFgMCERUCAREUARET2zxXEF8PbDERExEUERMREhETERIRERESEREREBERERABHAEaAdoPERAPVQ4rgQEBI1n0DW+hkjBt3yBukjBtndD0BIEBAdcAWWwSbwLiIG7jACBu8tCAbyKBAQtQA39xIW6VW1n0WTCYyAHPAEEz9EHigQEBAshZAvQAgQEBzwDJEDwSIG6VMFn0WjCUQTP0FeIJARsC7DBtgQELIn9xIW6VW1n0WTCYyAHPAEEz9EHiERIRFRESERERFBERERARExEQDxEVDw4RFA4NERMNDBEVDAsRFAsKERMKCREVCQgRFAgHERMHBhEVBgURFAUEERMEAxEVAwIRFAIBERMBERXbPAERFgFvAoEBASEBHAEdAAJwAKggbpIwbY4SIG7y0IBvIshZAvQAgQEBzwDJ4hArVhYBIG6VMFn0WjCUQTP0FeIREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0MVSgARILwopn9XmmCBbJLfuaj4iEnlryNt4150ZR7Xl8KfNTlKGLkc6JV"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBridge_init_args({
    $$type: "Bridge_init_args",
    chain_nonce,
    native_coin,
    base_uri,
    transfer_fee,
    protocol_fee,
    bootstrap_validator_key,
    bootstrap_validator_address,
    ton_liquidity_pool,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const Bridge_errors: { [key: number]: { message: string } } = {
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
  2296: {
    message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
  },
  2927: { message: `AccessControl: Role ID doesn't exist` },
  4129: { message: `Invalid native token id provided` },
  6936: {
    message: `Unsupported from_token for cross chain token strategy storage`,
  },
  7947: { message: `AccessControl: BadConfirmation` },
  9739: { message: `Sender is not a Jetton wallet` },
  11647: { message: `Unsupported incoming token strategy for from_chain_id` },
  13105: { message: `JettonWallet: Not enough jettons to transfer` },
  13199: { message: `Invalid token sent` },
  14558: { message: `Unsupported incoming token strategy for from_token` },
  17246: { message: `Insufficient funds Provided` },
  17773: { message: `JettonMaster: Mint can only be performed by owner` },
  19792: { message: `Contract is paused` },
  21733: { message: `AccessControl: Role doesn't exist` },
  22836: { message: `Target token does not have a liquidity pool configured` },
  23041: { message: `No fees to withdraw` },
  23263: { message: `Invalid Sender` },
  27831: { message: `Only owner can call this function` },
  27954: { message: `JettonMaster: Only Admin can set new owner.` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  29944: { message: `Pausable: Contract is already unpaused` },
  30061: { message: `JettonMaster: Jetton is not mintable` },
  31212: { message: `Unsupported incoming token strategy for from token` },
  33124: {
    message: `Unsupported to chain for cross chain token strategy storage`,
  },
  34665: { message: `Unsupported incoming token strategy for from chain id` },
  35462: { message: `JettonMaster: Only Admin can set new admin.` },
  37185: { message: `Not enough funds to transfer` },
  42526: {
    message: `Unsupported target_token for cross chain token strategy storage`,
  },
  43365: { message: `JettonMaster: Sender is not a Jetton owner` },
  44880: { message: `Transaction already processed.` },
  46934: { message: `Threshold not reached.` },
  47048: { message: `JettonWallet: Only owner can burn tokens` },
  49100: { message: `Invalid wrapped token id provided` },
  49236: { message: `Pool master is null for this _from_ token` },
  49646: { message: `Invalid Burn Notification Sender` },
  50245: { message: `Fees not configured for this chain` },
  50413: { message: `AccessControl: Doesnt have the role` },
  50658: { message: `Wrong chainId` },
  54023: { message: `AccessControl: Doesn't have role` },
  58304: { message: `Pausable: Contract is already paused` },
  59332: { message: `Target chainId cannot equal native or zero` },
  59662: {
    message: `Unsupported incoming token strategy for from_token -> target_token`,
  },
  60354: { message: `JettonWallet: Not enough balance to burn tokens` },
  60744: { message: `Incorrect Token Specified in arguments` },
  62556: { message: `Target token does not have ston.fi swapping configured` },
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
    name: "TokenTransfer",
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
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: true },
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
    name: "Installment",
    header: 2305391280,
    fields: [
      {
        name: "from_chain",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "target_chain",
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
        name: "nonce",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "from_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "to_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "recepient",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "SignerAndSignature",
    header: null,
    fields: [
      {
        name: "signature",
        type: { kind: "simple", type: "slice", optional: false },
      },
      {
        name: "key",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "ReceiveInstallment",
    header: 387504523,
    fields: [
      {
        name: "installment",
        type: { kind: "simple", type: "Installment", optional: false },
      },
      {
        name: "signatures",
        type: {
          kind: "dict",
          key: "int",
          value: "SignerAndSignature",
          valueFormat: "ref",
        },
      },
      {
        name: "len",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "tx_hash",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "FreezeTon",
    header: 3943853515,
    fields: [
      {
        name: "target_chain",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "to_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      { name: "to", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "from_token",
        type: { kind: "simple", type: "cell", optional: false },
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
    ],
  },
  {
    name: "MapContract",
    header: 4200416724,
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
      {
        name: "fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "fee_decimals",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "swap_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "token_bridge_wallet_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "liquidity_pool_master_address",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "ston_fi_target_token_wallet_for_ston_fi_router",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "SetChainFee",
    header: 1240718718,
    fields: [
      {
        name: "chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "fee",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "OutgoingTransaction",
    header: 1673830231,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
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
        name: "from_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "to_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      { name: "to", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "target_chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "IncomingTransaction",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
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
        name: "from_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "to_token",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "target_chain_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
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
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
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
        name: "symbol",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "swap_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "decimals",
        type: { kind: "simple", type: "uint", optional: false, format: 8 },
      },
      {
        name: "fee",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "fee_decimals",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "token_bridge_wallet_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "liquidity_pool_master_address",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "ston_fi_target_token_wallet_for_ston_fi_router",
        type: { kind: "simple", type: "address", optional: true },
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
    name: "RemoveMappedContract",
    header: 1790492737,
    fields: [
      {
        name: "token_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "ReleaseTokens",
    header: 2408663073,
    fields: [
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
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
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "UniqueReceiveInstallment",
    header: 952014607,
    fields: [
      {
        name: "ri",
        type: { kind: "simple", type: "ReceiveInstallment", optional: false },
      },
    ],
  },
  {
    name: "Strategies",
    header: null,
    fields: [
      {
        name: "strategies",
        type: { kind: "dict", key: "int", value: "Steps", valueFormat: "ref" },
      },
    ],
  },
  {
    name: "ToTokenCrossChainStrategy",
    header: null,
    fields: [
      {
        name: "to_token",
        type: {
          kind: "dict",
          key: "int",
          value: "CrossChainStrategy",
          valueFormat: "ref",
        },
      },
    ],
  },
  {
    name: "CrossChainTokenStrategy",
    header: null,
    fields: [
      {
        name: "from_token",
        type: {
          kind: "dict",
          key: "int",
          value: "ToTokenCrossChainStrategy",
          valueFormat: "ref",
        },
      },
    ],
  },
  {
    name: "FromTokenToTargetTokenToSteps",
    header: null,
    fields: [
      {
        name: "i",
        type: {
          kind: "dict",
          key: "int",
          value: "TargetTokenToSteps",
          valueFormat: "ref",
        },
      },
    ],
  },
  {
    name: "TargetTokenToSteps",
    header: null,
    fields: [
      {
        name: "i",
        type: { kind: "dict", key: "int", value: "Steps", valueFormat: "ref" },
      },
    ],
  },
  {
    name: "Steps",
    header: null,
    fields: [
      { name: "steps", type: { kind: "dict", key: "int", value: "int" } },
      {
        name: "size",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "CrossChainStrategy",
    header: null,
    fields: [
      {
        name: "local_steps",
        type: { kind: "simple", type: "Steps", optional: false },
      },
      {
        name: "foreign_steps",
        type: { kind: "simple", type: "Steps", optional: false },
      },
    ],
  },
  {
    name: "TargetTokenToCrossChainStrategy",
    header: null,
    fields: [
      {
        name: "i",
        type: {
          kind: "dict",
          key: "int",
          value: "CrossChainStrategy",
          valueFormat: "ref",
        },
      },
    ],
  },
  {
    name: "FromTokenToTargetTokenToCrossChainStrategy",
    header: null,
    fields: [
      {
        name: "i",
        type: {
          kind: "dict",
          key: "int",
          value: "TargetTokenToCrossChainStrategy",
          valueFormat: "ref",
        },
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
  {
    name: "AddValidator",
    header: 2513894818,
    fields: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "RemoveValidator",
    header: 3282419170,
    fields: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "SetIncomingStrategy",
    header: 1894737173,
    fields: [
      {
        name: "from_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "from_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "target_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "steps",
        type: { kind: "simple", type: "Steps", optional: false },
      },
    ],
  },
  {
    name: "SetCrossChainStrategy",
    header: 1825931216,
    fields: [
      {
        name: "target_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "from_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "target_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "local_steps",
        type: { kind: "simple", type: "Steps", optional: false },
      },
      {
        name: "foreign_steps",
        type: { kind: "simple", type: "Steps", optional: false },
      },
    ],
  },
  {
    name: "RemoveInternalStrategy",
    header: 1891525520,
    fields: [
      {
        name: "from_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "from_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "target_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "RemoveCrossChainStrategy",
    header: 207130758,
    fields: [
      {
        name: "target_chain",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "from_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "target_token",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
];

const Bridge_getters: ABIGetter[] = [
  {
    name: "manager_role_id",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "signer_role_id",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "cfo_role_id",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "validators",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "address" },
  },
  {
    name: "validators_count",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
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
    name: "tokens",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "Token",
      valueFormat: "ref",
    },
  },
  {
    name: "chain_fees",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "int" },
  },
  {
    name: "incoming_strategy",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "FromTokenToTargetTokenToSteps",
      valueFormat: "ref",
    },
  },
  {
    name: "cross_chain_strategy",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "FromTokenToTargetTokenToCrossChainStrategy",
      valueFormat: "ref",
    },
  },
  {
    name: "has_role",
    arguments: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
  {
    name: "role_admin",
    arguments: [
      {
        name: "role_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "admin_role_id",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
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
  { receiver: "internal", message: { kind: "typed", type: "MapContract" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RemoveMappedContract" },
  },
  { receiver: "internal", message: { kind: "text", text: "WithdrawFees" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ReceiveInstallment" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UniqueReceiveInstallment" },
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
  { receiver: "internal", message: { kind: "typed", type: "AddValidator" } },
  { receiver: "internal", message: { kind: "typed", type: "RemoveValidator" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "SetIncomingStrategy" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "SetCrossChainStrategy" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RemoveCrossChainStrategy" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "RemoveInternalStrategy" },
  },
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "text", text: "Pause" } },
  { receiver: "internal", message: { kind: "text", text: "Unpause" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "GrantRole" } },
  { receiver: "internal", message: { kind: "typed", type: "RevokeRole" } },
  { receiver: "internal", message: { kind: "typed", type: "RenounceRole" } },
  { receiver: "internal", message: { kind: "typed", type: "UpdateRoleAdmin" } },
];

export class Bridge implements Contract {
  static async init(
    chain_nonce: bigint,
    native_coin: bigint,
    base_uri: string,
    transfer_fee: bigint,
    protocol_fee: bigint,
    bootstrap_validator_key: bigint,
    bootstrap_validator_address: Address,
    ton_liquidity_pool: Address
  ) {
    return await Bridge_init(
      chain_nonce,
      native_coin,
      base_uri,
      transfer_fee,
      protocol_fee,
      bootstrap_validator_key,
      bootstrap_validator_address,
      ton_liquidity_pool
    );
  }

  static async fromInit(
    chain_nonce: bigint,
    native_coin: bigint,
    base_uri: string,
    transfer_fee: bigint,
    protocol_fee: bigint,
    bootstrap_validator_key: bigint,
    bootstrap_validator_address: Address,
    ton_liquidity_pool: Address
  ) {
    const init = await Bridge_init(
      chain_nonce,
      native_coin,
      base_uri,
      transfer_fee,
      protocol_fee,
      bootstrap_validator_key,
      bootstrap_validator_address,
      ton_liquidity_pool
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
      | MapContract
      | RemoveMappedContract
      | "WithdrawFees"
      | ReceiveInstallment
      | UniqueReceiveInstallment
      | SetChainFee
      | JettonExcesses
      | UpdateProtocolFee
      | UpdateBaseUri
      | UpdateTransferFee
      | AddValidator
      | RemoveValidator
      | SetIncomingStrategy
      | SetCrossChainStrategy
      | RemoveCrossChainStrategy
      | RemoveInternalStrategy
      | null
      | "Pause"
      | "Unpause"
      | Deploy
      | GrantRole
      | RevokeRole
      | RenounceRole
      | UpdateRoleAdmin
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
      message.$$type === "MapContract"
    ) {
      body = beginCell().store(storeMapContract(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveMappedContract"
    ) {
      body = beginCell().store(storeRemoveMappedContract(message)).endCell();
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
      message.$$type === "UniqueReceiveInstallment"
    ) {
      body = beginCell()
        .store(storeUniqueReceiveInstallment(message))
        .endCell();
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
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetIncomingStrategy"
    ) {
      body = beginCell().store(storeSetIncomingStrategy(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetCrossChainStrategy"
    ) {
      body = beginCell().store(storeSetCrossChainStrategy(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveCrossChainStrategy"
    ) {
      body = beginCell()
        .store(storeRemoveCrossChainStrategy(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RemoveInternalStrategy"
    ) {
      body = beginCell().store(storeRemoveInternalStrategy(message)).endCell();
    }
    if (message === null) {
      body = new Cell();
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
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "GrantRole"
    ) {
      body = beginCell().store(storeGrantRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RevokeRole"
    ) {
      body = beginCell().store(storeRevokeRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "RenounceRole"
    ) {
      body = beginCell().store(storeRenounceRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateRoleAdmin"
    ) {
      body = beginCell().store(storeUpdateRoleAdmin(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getManagerRoleId(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("manager_role_id", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getSignerRoleId(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("signer_role_id", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getCfoRoleId(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("cfo_role_id", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getValidators(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("validators", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Address(),
      source.readCellOpt()
    );
    return result;
  }

  async getValidatorsCount(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("validators_count", builder.build()))
      .stack;
    let result = source.readBigNumber();
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

  async getTokens(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("tokens", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserToken(),
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

  async getIncomingStrategy(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("incoming_strategy", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserFromTokenToTargetTokenToSteps(),
      source.readCellOpt()
    );
    return result;
  }

  async getCrossChainStrategy(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("cross_chain_strategy", builder.build()))
      .stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserFromTokenToTargetTokenToCrossChainStrategy(),
      source.readCellOpt()
    );
    return result;
  }

  async getHasRole(
    provider: ContractProvider,
    address: Address,
    role_id: bigint
  ) {
    let builder = new TupleBuilder();
    builder.writeAddress(address);
    builder.writeNumber(role_id);
    let source = (await provider.get("has_role", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }

  async getRoleAdmin(provider: ContractProvider, role_id: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(role_id);
    let source = (await provider.get("role_admin", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getAdminRoleId(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("admin_role_id", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }
}