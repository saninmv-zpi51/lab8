const form = document.querySelector(".promise-form");
const results = document.querySelector("#results");

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }

    }, delay);

  });

}

form.addEventListener("submit", event => {

  event.preventDefault();

  results.innerHTML = "";

  const delay =
    Number(form.elements.delay.value);

  const step =
    Number(form.elements.step.value);

  const amount =
    Number(form.elements.amount.value);

  for (let i = 1; i <= amount; i++) {

    const currentDelay =
      delay + (i - 1) * step;

    createPromise(i, currentDelay)

      .then(({ position, delay }) => {

        results.innerHTML += `
          <div class="success">
            ✅ Promise ${position}
            fulfilled in ${delay}ms
          </div>
        `;

      })

      .catch(({ position, delay }) => {

        results.innerHTML += `
          <div class="error">
            ❌ Promise ${position}
            rejected in ${delay}ms
          </div>
        `;

      });

  }

});