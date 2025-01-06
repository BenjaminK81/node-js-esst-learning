import test from 'node:test';
import assert from 'node:assert';

test("My Test-Group", async (t) => {

    let array;

    t.beforeEach(()=>{
        array = ['foo'];
    })

    await t.test('test array length', () => {
        array.push("bar");
        assert.strictEqual(array.length, 2);
    });

    await t.test('test array length', () => {
        array.push("bar");
        assert.strictEqual(array.length, 2);
    });

    await t.test('test array length', () => {
        array.push("bar");
        assert.strictEqual(array.length, 2);
    });
});