# solc_openzeppelin

Веб сервис для компиляции контрактов из набора OpenZeppelin.

На вход принимает POST запросы:
Получить abi контракта.
{method: "solc_abi", params:["путь к контракту начиная с папки /contracts"]}
Ответ: 
{success: true, abi: <abi_json>}
Пример
POST / {method: "solc_abi", params:["/contracts/token/ERC20/ERC20.sol"]}
returns
{success: true, abi: [{name: "method1", constant: true, ...}]}

Получить код контракта.
{method: "solc_bin", params:["путь к контракту начиная с папки /contracts"]}
Ответ: 
{success: true, bin: "<bin code>"}
Пример
POST / {method: "solc_bin", params:["/contracts/token/ERC20/ERC20.sol"]}
returns
{success: true, bin: "091273019098099s7df654s6436as8df7sdf8..."}

Получить abi и код контракта.
{method: "solc", params:["путь к контракту начиная с папки /contracts"]}
Ответ: 
{success: true, abi: <abi_json>, bin: "<bin code>"}
Пример
POST / {method: "solc", params:["/contracts/token/ERC20/ERC20.sol"]}
returns
{success: true, abi: [{name: "method1", constant: true, ...}], bin: "09098099s7df654s6436as8df7sdf8..."}



Компилятор SOLC брать тут
https://github.com/ethereum/solidity/releases
wget -O solc https://github.com/ethereum/solidity/releases/download/v0.5.7/solc-static-linux



Набор контрактов OpenZeppelin брать тут
https://github.com/OpenZeppelin/openzeppelin-solidity

