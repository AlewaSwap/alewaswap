import {
  Account,
  initThreadPool,
  PrivateKey,
  ProgramManager,
} from "@provablehq/sdk";

await initThreadPool();

const alewa_program = `
alewa_14985.aleo;

function deposit:
    input r0 as field.public;
    input r1 as u64.public;
    get.or_use balances[r0] 0u64 into r2;
    add r2 r1 into r3;
    set r3 into balances[r0];`

async function localProgramExecution(program: string, aleoFunction: string, inputs: string[]) {
  const programManager = new ProgramManager();

  // Create a temporary account for the execution of the program
  const account = new Account();
  programManager.setAccount(account);

  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false,
  );
  return executionResponse.getOutputs();
}

function getPrivateKey() {
  return new PrivateKey().to_string();
}

onmessage = async function (e) {
  if (e.data === "execute") {
    const result = await localProgramExecution(alewa_program, "deposit", ["5u32", "2u64"]);
    postMessage({ type: "execute", result: result });
  } else if (e.data === "key") {
    const result = getPrivateKey();
    postMessage({ type: "key", result: result });
  }
};
