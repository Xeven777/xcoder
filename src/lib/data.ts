export interface CodeSnippetsProps {
  [key: string]: string;
}

export const languageOptions = [
  "assembly",
  "c",
  "csharp",
  "cpp",
  "clojure",
  "css",
  "dart",
  "elixir",
  "fsharp",
  "go",
  "groovy",
  "haskell",
  "html",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "less",
  "lua",
  "matlab",
  "perl",
  "php",
  "python",
  "r",
  "ruby",
  "rust",
  "sass",
  "scala",
  "shell",
  "sql",
  "swift",
  "typescript",
  "vhdl",
  "verilog",
  "xml",
];

export const codeSnippets: CodeSnippetsProps = {
  assembly: `
section .data
msg db 'Hello, World!', 0
section .text
global _start
_start:
mov edx, len
mov ecx, msg
mov ebx, 1
mov eax, 4
int 0x80
mov eax, 1
int 0x80
`,
  c: `
#import <stdio.h>
int main() {
  printf("Hello, World!");
  return 0;
}
`,
  csharp: `
using System;
class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}
`,
  cpp: `
#include <iostream>
int main() {
  std::cout << "Hello, World!";
  return 0;
}
`,
  clojure: `
(defn -main []
  (println "Hello, World!"))
`,
  css: `
body {
  color: red;
}
`,
  dart: `
void main() {
  print('Hello, World!');
}
`,
  elixir: `
IO.puts "Hello, World!"
`,
  fsharp: `
open System
[<EntryPoint>]
let main argv =
  Console.WriteLine("Hello, World!")
  0
`,
  go: `
package main
import "fmt"
func main() {
  fmt.Println("Hello, World!")
}
`,
  groovy: `
class HelloWorld {
  static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`,
  haskell: `
main = putStrLn "Hello, World!"
`,
  html: `
<!DOCTYPE html>
<html>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
`,
  java: `
class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`,
  javascript: `
console.log("Hello, World!");
`,
  json: `
{
  "hello": "world"
}
`,
  jsx: `
import React from 'react';
function App() {
  return <h1>Hello, World!</h1>;
}
`,
  kotlin: `
fun main() {
  println("Hello, World!")
}
`,
  less: `
@color: red;
body {
  color: @color;
}
`,
  lua: `
print("Hello, World!")
`,
  matlab: `
disp('Hello, World!')
`,
  perl: `
print "Hello, World!\n";
`,
  php: `
<?php
echo "Hello, World!";
?>
`,
  python: `
print("Hello, World!")
`,
  r: `
print("Hello, World!")
`,
  ruby: `
puts "Hello, World!"
`,
  rust: `
fn main() {
  println!("Hello, World!");
}
`,
  sass: `
$color: red;
body {
  color: $color;
}
`,
  scala: `
object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}
`,
  shell: `
echo "Hello, World!"
`,
  sql: `
SELECT 'Hello, World!';
`,
  swift: `
print("Hello, World!")
`,
  typescript: `
console.log("Hello, World!");
`,
  vhdl: `
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;
entity hello_world is
end hello_world;
architecture rtl of hello_world is
begin
  process
  begin
    report "Hello, World!";
    wait;
  end process;
end rtl;
`,
  verilog: `
module hello_world;
initial
begin
  $display("Hello, World!");
  $finish;
end
endmodule
`,
  xml: `
<root>
  <hello>world</hello>
</root>
`,
};
