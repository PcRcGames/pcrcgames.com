const separatorChar = document.querySelector("#separator-input");
const importantForm = document.querySelector("#important-form");
const structName = document.querySelector("#struct-name");
const outputDiv = document.querySelector("#output-div");
const fileInput = document.querySelector("#file-input");
const namespace = document.querySelector("#namespace");
const arrayName = document.querySelector("#array-name");

importantForm.addEventListener("submit", (e) => {
    e.preventDefault();
    importantForm.style.visibility = "hidden";
    let texts = Array(document.querySelector("#data-names-div").children.length).fill("")
    let innerText = ["\n\tstring ", "\n\tint ", "\n\tfloat "] 

    for (let i = 0; i < document.querySelector("#data-names-div").children.length; i++) {
        if (document.querySelector(`#variable-type-${i}`).value == "int"){
            texts[0] += `int.Parse(data[${i}]), `
            texts[1] += `int _${document.querySelector(`#variable-name-${i}`).value}, `
            innerText[1] += `${document.querySelector(`#variable-name-${i}`).value}, `
        }
        else if (document.querySelector(`#variable-type-${i}`).value == "float") {
            texts[0] += `float.Parse(data[${i}]), `
            texts[1] += `float _${document.querySelector(`#variable-name-${i}`).value}, `
            innerText[2] += `${document.querySelector(`#variable-name-${i}`).value}, `
        }
        else {
            texts[0] += `data[${i}], `
            texts[1] += `string _${document.querySelector(`#variable-name-${i}`).value}, `
            innerText[0] += `${document.querySelector(`#variable-name-${i}`).value}, `
        }

        texts[2] += `\t${document.querySelector(`#variable-name-${i}`).value} = _${document.querySelector(`#variable-name-${i}`).value};\n`
    }

    for (let i = 0; i < innerText.length; i++) {
        if (innerText[i] == "\n\tstring " || innerText[i] == "\n\tint " || innerText[i] == "\n\tfloat ") {
            innerText[i] = "";
            continue;
        }
        innerText[i] = innerText[i].slice(0, innerText[i].length - 2) + ";"
    }

    texts[0] = texts[0].slice(0, texts[0].length - 2)
    texts[1] = texts[1].slice(0, texts[1].length - 2)
    texts[4] = innerText

    generate(texts);
})

fileInput.addEventListener("change", () => {
    readFile();
})

function readFile() {
    let reader = new FileReader();
    reader.onload = (e) => {
        let dataRows = e.target.result.split("\n");
        let dataRow = dataRows[dataRows.length - 1].split(separatorChar.value);
        openForm(dataRow);
    }

    reader.readAsText(fileInput.files[0]);
}

function openForm(dataRow) {
    document.querySelector("#file-label").parentElement.style.display = "none";
    for (let i = 0; i < dataRow.length; i++) {
        document.querySelector("#data-names-div").innerHTML += `
            <div style="width: ${100 / dataRow.length - 2}%; padding: 0 1%;">
                <input type="text" id="variable-name-${i}">
                <select id="variable-type-${i}">
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="string">string</option>
                </select>
            </div>
        `
    }

    importantForm.style.visibility = "visible";
}

function generate(texts) {
    outputDiv.innerHTML += "<h2># Import</h2>"

    outputDiv.innerHTML += `
    <pre class="prettyprint linenums lang-cs">
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System;
    </pre>`

    outputDiv.innerHTML += "<h2>#Beolvasás - tömb generálása</h2>"
    
    outputDiv.innerHTML += `
    <pre class="prettyprint linenums lang-cs">
namespace ${namespace.value}
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] lines = File.ReadAllLines("${fileInput.files[0].name}");
            ${structName.value}[] ${arrayName.value} = new ${structName.value}[lines.Length - 1];

            for (int i = 0; i < lines.Length - 1; i++)
            {
                string[] data = lines[i + 1].Split("${separatorChar.value}");
                ${arrayName.value}[i] = new ${structName.value}(${texts[0]});
            }

            // Console.WriteLine("3. Feladat: " + ${arrayName.value}.Length);

        }
    }
}
    </pre>`

    outputDiv.innerHTML += "<h2># Struct létrehozása</h2>"

    outputDiv.innerHTML += `
    <pre class="prettyprint linenums lang-cs">
struct ${structName.value}
{
${texts[4][0]}${texts[4][1]}${texts[4][2]}

    public ${structName.value}(${texts[1]})
    {
${texts[2]}
    }
}
    </pre>`

    let script = document.createElement("script");
    script.src = "./prettify/prettify.js";
    document.head.appendChild(script);
}