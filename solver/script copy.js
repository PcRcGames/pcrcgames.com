function dropHandler(ev) {
    console.log("File(s) dropped");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
































/*
const separatorChar = document.querySelector('#separator-char');
const outputDiv = document.querySelector("#output-div");
const fileInput = document.querySelector("#file-input");





codes = [
    {
        name : "Imports",
        code : 
``
    }
]

reader = new FileReader();
reader.onload = (e) => {
    let lines = e.target.result.split("\n")
    let titles = lines[0].split(separatorChar.value);
    let strings = []
    let ints = []

    let text = ""
    let text2 = ""

    let testDatas = lines[1].split(separatorChar.value);
    for (let i = 0; i < testDatas.length; i++) {
        if(isNaN(parseFloat(testDatas[i]))) {
            strings.push(titles[i]);
            text += `data[${i}], `
        }
        else {
            ints.push(titles[i]);
            text += `int.Parse(data[${i}]), `
        }

        text2 += `${titles[i]} = _${titles[i]}\n`
    }

    text = text.slice(0, text.length - 2)


    codes.push({
        name : "-----",
        code : 
`string[] lines = File.ReadAllLines("${e.target.fileName}");
Data[] datas = new Data[lines.Length - 1];

for (int i = 0; i < lines.Length - 1; i++)
{
    string[] data = lines[i + 1].Split("${separatorChar.value}");
    datas[i] = new Data(${text});
}`
    })  
    
    codes.push({
        name : "------",
        code:
`class Data
{
    public string;

    public ClassName(string _data1, string _data2, string _data3)
    {
        data1 = _data1;
        data2 = _data2;
        data3 = _data3;
    }
}`
    })
};

fileInput.addEventListener("change", () => {
    for (let i = 0; i < fileInput.files.length; i++) {
        reader.fileName = fileInput.files[i].name
        reader.readAsText(fileInput.files[i])
    }

    //displayCodes();
})

function displayCodes() {
    codes.forEach(code => {
        outputDiv.innerHTML += `<h2>${code.name}</h2>`
        outputDiv.innerHTML += `<pre class="prettyprint linenums lang-cs">${code.code}</pre>`
    });

    script = document.createElement("script");
    script.src = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js";
    document.head.appendChild(script);
}

code = 
`
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System;

namespace Namespace
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] lines = File.ReadAllLines("filename.txt");
            ClassName[] classNames = new ClassName[lines.Length - 1];

            for (int i = 0; i < lines.Length - 1; i++)
            {
                string[] data = lines[i + 1].Split("\t");
                classNames[i] = new ClassName(data[0], data[1], data[2]);
            }

            // Console.WriteLine("3. Feladat: " + classNames.Length);

        }
    }
}

class ClassName
{
    public string data1, data2, data3;

    public ClassName(string _data1, string _data2, string _data3)
    {
        data1 = _data1;
        data2 = _data2;
        data3 = _data3;
    }
}`

//outputDiv.innerHTML = code;

*/