import React from "react";
import MainButton from "../../components/MainButton";
import styles from "./styles.module.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function DashBoard({ setPage }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [entries, setEntries] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) {
      return alert("Descrição inválida.");
    }

    if (type == "") {
      return alert("Selecione o tipo de resumo.");
    }

    setEntries([...entries, { id: uuid(), description, value, type }]);
    setDescription("");
    setValue(0);
    setType("");
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function valueValid(entry) {
    const valueAsNumber = Number(value);
    if (isNaN(valueAsNumber)) {
      return alert("O valor precisa ser um número válido");
    }

    return `R$ ${entry.value},00`;
  }
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header__container}>
          <div className={styles.header__align}>
            <img src="/src/assets/nuKenzieDash.svg" alt="Nu Kenzie Logo" />
            <MainButton
              onClicked={() => setPage("LandingPage")}
              newClass={styles.header__button}
              value="Início"
            />
          </div>
        </header>
        <div className={styles.alignMain}>
          <main className={styles.main__container}>
            <section className={styles.section__addResume}>
              <h4 className={styles.title4}>Descrição</h4>
              <form>
                <input
                  className={styles.inputDescript}
                  type="text"
                  placeholder="Digite aqui sua descrição"
                  onChange={handleDescriptionChange}
                />
                <p className={styles.exampleDescript}>Ex: Compra de roupas</p>
                <div className={styles.alignLabel}>
                  <label className={styles.labelValue} htmlFor="valor">
                    Valor
                  </label>
                  <label className={styles.labelTypeValue} htmlFor="select">
                    Tipo de valor
                  </label>
                </div>
                <div className={styles.alignInputs}>
                  <input
                    className={styles.inputValue}
                    id="valor"
                    type="text"
                    placeholder="1"
                    onChange={handleValueChange}
                  />
                  <p className={styles.exchange}>R$</p>
                  <select
                    className={styles.selectValue}
                    name="selectValue"
                    id="select"
                    onChange={handleTypeChange}
                    value={type}
                  >
                    <option value="select">Selecione o tipo</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Despesa">Despesa</option>
                  </select>
                </div>
                <MainButton
                  value="Inserir Valor"
                  newClass={styles.buttonAddToResume}
                  onClicked={handleSubmit}
                />
              </form>
            </section>
            <section className={styles.section__financialResume}>
              <h2 className={styles.title2}>Resumo financeiro</h2>
              <h1 className={styles.title1}>
                Você ainda não possui nenhum lançamento
              </h1>
              <ul className={styles.resumeList}>
                {entries.length === 0 ? (
                  <>
                    <li className={styles.resumeOff}>
                      <div className={styles.box1}></div>
                      <div className={styles.boxContent}>
                        <div className={styles.box2}></div>
                        <div className={styles.box3}></div>
                      </div>
                    </li>

                    <li className={styles.resumeOff}>
                      <div className={styles.box1}></div>
                      <div className={styles.boxContent}>
                        <div className={styles.box2}></div>
                        <div className={styles.box3}></div>
                      </div>
                    </li>
                  </>
                ) : (
                  entries.map((entry) => (
                    <>
                      <li key={entry.id} className={styles.resume}>
                        <div className={styles.boxGreen}></div>
                        <div className={styles.boxText}>
                          <p className={styles.resumeName}>
                            {entry.description}
                          </p>
                          <p className={styles.valueType}>{entry.type}</p>
                        </div>
                        <p className={styles.valueEntrie}>
                          {valueValid(entry)}
                        </p>
                        <button className={styles.removeResumeBtn}>
                          <img src="/src/assets/trash.svg" alt="Lixo" />
                        </button>
                      </li>
                    </>
                  ))
                )}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
