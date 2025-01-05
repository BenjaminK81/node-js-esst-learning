import test from 'node:test'; // Seit NodJs 20.0.0 eine eigene Testumgebung
import assert from 'assert'; // Modul für Verifizierung und Validierung von Werten

function getLength(array) {
    return array.length;
}

// Dieser Test erwartet die genaue Anzahl an Zeichen von 3
test('should return 3', ()=>{
    assert.strictEqual(getLength([1,3,4]), 3);
});

test('should throw error when null', ()=>{
   assert.throws(()=>{
    getLength(null);
   }) 
});

test('should throw undefined for empty object', ()=>{
    assert.doesNotThrow(()=>{
     getLength({});
    });

    assert.strictEqual(getLength({}), undefined);

 });
