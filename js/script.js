const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
let html = "";
const getApi = async () => {
  const url = "https://api.ratesapi.io/api/latest";
  const res = await fetch(url);
  const apiData = await res.json();
  const rate = apiData.rates;
  const curName = Object.keys(apiData.rates);
  curName.map(item => {
    return (html += `<option value=${item}> ${item}</option> `);
  });
  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }

  function convert(i, j) {
    input[i].value =
      (input[j].value * rate[select[i].value]) / rate[select[j].value];
  }
  input[0].addEventListener("keyup", () => convert(1, 0));
  input[1].addEventListener("keyup", () => convert(0, 1));
  select[0].addEventListener("change", () => convert(1, 0));
  select[1].addEventListener("change", () => convert(0, 1));
  console.log(rate);
};
getApi();
