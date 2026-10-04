import { error } from "console";
import fs from "fs/promises";

// fs.writeFileSync("hello.txt", "Hello Amir Hope You will get the internship");
// // write file Sync = write file synchronously mean wait until finish
// fs.writeFileSync("hello.txt", "Node.js waits for the file operation to finish before continuing");


// const data = fs.readFileSync("hello.txt", "utf-8");
// if we dont put the utf-8 then data will be showing like this

//<Buffer 4e 6f 64 65 2e 6a 73 20 77 61 69 74 73 20 66 6f 72 20 
// 74 68 65 20 66 69 6c 65 20 6f 70 65 72 61 74 69 6f 6e 20 74 
// 6f 2066 69 6e 69 73 68 20 62 65 66 ... 14 more bytes>



//console.log(data);


// asynchronous write data


// async function writeData() {
//   const content = 'Hello, this is written using ES Modules in Node.js!\n';

//   try {
//     // writeFile overwrites the file if it already exists, or creates it if it doesn't
//     await fs.writeFile('hello.txt', content, 'utf-8');
//     console.log('File written successfully.');
//   } catch (error) {
//     console.error('Error writing file:', error);
//   }
// }

// writeData();

//asynchronous append data 
// async function appendData() {
//   const content = 'Hope that i will get internship next summer Please God help me in this\n';

//   try {
//     // writeFile overwrites the file if it already exists, or creates it if it doesn't
//     await fs.appendFile('hello.txt', content, 'utf-8');
//     console.log('File Appended successfully.');
//   } catch (error) {
//     console.error('Error writing file:', error);
//   }
// }

// appendData();

// async function writeData() {
//   const content = 'Hello, this is written using ES Modules in Node.js!\n';

//   try {
//     // writeFile overwrites the file if it already exists, or creates it if it doesn't
//     await fs.writeFile('helloAmir.txt', content, 'utf-8');
//     console.log('File written successfully.');
//   } catch (error) {
//     console.error('Error writing file:', error);
//   }
// }

// writeData();

// fs.unlink("helloAmir.txt", (error) => {
//     if(error)
//     {
//         console.log(error);
//         return;
//     }
//     console.log("file deleted Successfully");
// })