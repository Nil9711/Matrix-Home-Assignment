const { calculate } = require('../service/DefaultService');

// Simple test runner for async functions
async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`Success! ${name}`);
  } catch (error) {
    console.log(`Failure! ${name}: ${error.message}`);
  }
}

// Simple assertion
function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

// Helper to test error cases
function assertError(error, expectedCode) {
  if (error.code !== expectedCode) {
    throw new Error(`Expected error code ${expectedCode}, got ${error.code}`);
  }
}

console.log('Running calculate tests...\n');

// ADD TESTS
testAsync('Add: positive numbers', async () => {
  const result = await calculate({ number: 5, secondNumber: 3 }, 'add');
  assertEqual(result.result, 8);
});

testAsync('Add: negative numbers', async () => {
  const result = await calculate({ number: -5, secondNumber: -3 }, 'add');
  assertEqual(result.result, -8);
});

testAsync('Add: decimal numbers', async () => {
  const result = await calculate({ number: 2.5, secondNumber: 1.5 }, 'add');
  assertEqual(result.result, 4);
});

testAsync('Add: zero', async () => {
  const result = await calculate({ number: 10, secondNumber: 0 }, 'add');
  assertEqual(result.result, 10);
});

// SUBTRACT TESTS
testAsync('Subtract: positive numbers', async () => {
  const result = await calculate({ number: 10, secondNumber: 3 }, 'subtract');
  assertEqual(result.result, 7);
});

testAsync('Subtract: negative result', async () => {
  const result = await calculate({ number: 3, secondNumber: 10 }, 'subtract');
  assertEqual(result.result, -7);
});

testAsync('Subtract: negative numbers', async () => {
  const result = await calculate({ number: -5, secondNumber: -3 }, 'subtract');
  assertEqual(result.result, -2);
});

// MULTIPLY TESTS
testAsync('Multiply: positive numbers', async () => {
  const result = await calculate({ number: 4, secondNumber: 5 }, 'multiply');
  assertEqual(result.result, 20);
});

testAsync('Multiply: by zero', async () => {
  const result = await calculate({ number: 10, secondNumber: 0 }, 'multiply');
  assertEqual(result.result, 0);
});

testAsync('Multiply: negative numbers', async () => {
  const result = await calculate({ number: -4, secondNumber: 3 }, 'multiply');
  assertEqual(result.result, -12);
});

testAsync('Multiply: decimal numbers', async () => {
  const result = await calculate({ number: 2.5, secondNumber: 4 }, 'multiply');
  assertEqual(result.result, 10);
});

// DIVIDE TESTS
testAsync('Divide: positive numbers', async () => {
  const result = await calculate({ number: 15, secondNumber: 3 }, 'divide');
  assertEqual(result.result, 5);
});

testAsync('Divide: decimal result', async () => {
  const result = await calculate({ number: 10, secondNumber: 4 }, 'divide');
  assertEqual(result.result, 2.5);
});

testAsync('Divide: negative numbers', async () => {
  const result = await calculate({ number: -12, secondNumber: 3 }, 'divide');
  assertEqual(result.result, -4);
});

testAsync('Divide: by zero (should error)', async () => {
  try {
    await calculate({ number: 5, secondNumber: 0 }, 'divide');
    throw new Error('Should have thrown error');
  } catch (error) {
    assertError(error, 'DIVISION_BY_ZERO');
  }
});

// EDGE CASES
testAsync('Invalid operation', async () => {
  try {
    await calculate({ number: 5, secondNumber: 3 }, 'power');
    throw new Error('Should have thrown error');
  } catch (error) {
    assertError(error, 'INVALID_OPERATION');
  }
});

testAsync('Invalid input - string as number', async () => {
  try {
    await calculate({ number: "hello", secondNumber: 3 }, 'add');
    throw new Error('Should have thrown error');
  } catch (error) {
    assertError(error, 'INVALID_INPUT');
  }
});

testAsync('Invalid input - missing secondNumber', async () => {
  try {
    await calculate({ number: 5 }, 'add');
    throw new Error('Should have thrown error');
  } catch (error) {
    assertError(error, 'INVALID_INPUT');
  }
});

// LARGE NUMBER TESTS
testAsync('Large numbers - within safe range', async () => {
  const result = await calculate({ number: 1000000, secondNumber: 2000000 }, 'add');
  assertEqual(result.result, 3000000);
});

console.log('\nTests complete!');