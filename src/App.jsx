import React, { useEffect, useState } from "react";
// import Slider from '@mui/material/Slider';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./app.css";

export default function App() {
  let [password, setPassword] = useState("h");
  let [generatedPassword, setGeneratedPassword] = useState("");
  let [length, setLength] = useState(6);
  let [upperCase, setUpperCase] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [LowerCase, setLowerCase] = useState(true);
  let [numbers, setNumbers] = useState(false);
  let [isCopied, setIsCopied] = useState(false);

  let generatePassword = () => {
    let upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    let LowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
    let symbolStr = "!@#$%^&*";
    let numberStr = "0123456789";

    // let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz!@#$%^&*0123456789'
    let str = "";
    if (upperCase) {
      str += upperCaseStr;
    }
    if (LowerCase) {
      str += LowerCaseStr;
    }
    if (symbol) {
      str += symbolStr;
    }
    if (numbers) {
      str += numberStr;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * str.length);
      pass += str[randomInd];
    }
    setGeneratedPassword(pass);
    setIsCopied(false);
  };
  const copyToClipboard = () => {
    const passwordField = document.getElementById("password-field");

    if (passwordField) {
      passwordField.select();
      document.execCommand("copy");
      setIsCopied(true);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, upperCase, LowerCase, symbol, numbers]);

  // console.log(upperCase)
  return (
    <div>
      <main>
        <div className="container mt-5">
          <h1 className="fw-bold text-center my-5">Random Password Generator</h1>
          <div className="row">
            <div className="offset-md-2 col-md-8 offset-md-2  p-2">
              <div>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <Form.Control
                      type="text"
                      id="password-field"
                      value={generatedPassword}
                      className="my-2"
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <Button variant="primary" className="my-2" onClick={copyToClipboard}>
                      {isCopied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <Form.Control
                      type="number"
                      placeholder="Type here"
                      className="my-2"
                      value={length}
                      readOnly
                    />
                  </div>
                  <div className="col-md-8 my-auto">
                    <Form.Range
                      type="range"
                      min={8}
                      max={50}
                      className="my-2"
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                </div>
                <Form.Check
                  type="checkbox"
                  label="UpperCase"
                  checked={upperCase}
                  className="mb-2"
                  onChange={() => setUpperCase(!upperCase)}
                />{" "}
                <Form.Check
                  type="checkbox"
                  className="mb-2"
                  label="Lower Case"
                  checked={LowerCase}
                  onChange={(e) => setLowerCase(e.target.value)}
                />{" "}
                <Form.Check
                  type="checkbox"
                  checked={symbol}
                  className="mb-2"
                  label="SymBol Character"
                  onChange={() => setSymbol(!symbol)}
                />{" "}
                <Form.Check
                  type="checkbox"
                  className="mb-2"
                  checked={numbers}
                  id="number-check"
                  label="Numbers Character"
                  onChange={(e) => setNumbers(!numbers)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
