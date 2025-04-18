## Kiến thức cơ bản cần nắm

### 1. `var`, `let`, `const` và Hoisting

**Hoisting** là hiện tượng các khai báo biến và hàm được "đưa lên đầu" phạm vi của chúng trước khi code được thực thi.

- `var` **được hoisted**, nhưng **gán giá trị sau**, nên sẽ trả về `undefined` nếu gọi trước khi khai báo.
- `let` và `const` **cũng được hoisted**, nhưng nằm trong **"Temporal Dead Zone"** — gọi trước khi khai báo sẽ bị lỗi.

```javascript
console.log(a); // output: undefined
var a = 5;

console.log(b); // output: ReferenceError
let b = 10;
```

### 2. Function Scope vs Block Scope

```javascript
if (true) {
  var x = 1;
  let y = 2;
}
console.log(x); // 1
console.log(y); // ReferenceError
```

### 3. Function vs Arrow Function

```javascript
function sayHello() {
  console.log("Hello");
}

const sayHi = () => {
  console.log("Hi");
};
```

### 4. console và console.log

```javascript
console.log("Hello"); // In ra thông tin
console.error("Lỗi!"); // In lỗi
console.warn("Cảnh báo"); // In cảnh báo
console.table([1, 2, 3]); // In bảng
```
