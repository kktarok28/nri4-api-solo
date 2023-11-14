window.addEventListener("load", () => {
  // YOUR SOLUTION GOES HERE.
});

window.addEventListener("DOMContentLoaded", () => {
  const object = {};
  let dialog = document.querySelector("dialog"); // dialog（モーダルダイアログ）の宣言
  let btn_post = document.getElementById("post"); // open（開く）ボタンの宣言
  let btn_patch = document.getElementById("patch"); // close（閉じる）ボタンの宣言
  let btn_delete = document.getElementById("delete"); // close（閉じる）ボタンの宣言
  let btn_close = document.getElementById("close"); // close（閉じる）ボタンの宣言

  const tableBody = document.querySelector("#myTable tbody");
  fetch("http://localhost:3003/api/resutaurants/reviews/users/03343")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.reviewList.forEach((review) => {
        object[review["restaurant_name"]] = review["restaurant_id"];
        const row = document.createElement("tr");

        const viewList = [
          "restaurant_name",
          "taste_level",
          "speed_level",
          "crowd_level",
          "sum",
          "own_taste_level",
          "own_speed_level",
          "own_crowd_level",
        ];
        viewList.forEach((view) => {
          const cell = document.createElement("td");
          cell.textContent = review[view];
          row.appendChild(cell);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "登録/更新/削除";
        deleteButton.addEventListener("click", function () {
          const clickedRow = this.closest("tr");
          const restaurantName =
            clickedRow.querySelector("td:first-child").textContent;

          //ダイアログのIDを指定
          dialog.dataset.restaurantId = object[restaurantName];
          dialog.dataset.clickedRow = clickedRow;
          dialog.showModal();
        });
        const actionCell = document.createElement("td");
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    });

  btn_close.addEventListener(
    "click",
    function () {
      while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }

      fetch("http://localhost:3003/api/resutaurants/reviews/users/03343")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          res.reviewList.forEach((review) => {
            object[review["restaurant_name"]] = review["restaurant_id"];
            const row = document.createElement("tr");

            const viewList = [
              "restaurant_name",
              "taste_level",
              "speed_level",
              "crowd_level",
              "sum",
              "own_taste_level",
              "own_speed_level",
              "own_crowd_level",
            ];
            viewList.forEach((view) => {
              const cell = document.createElement("td");
              cell.textContent = review[view];
              row.appendChild(cell);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "登録/更新/削除";
            deleteButton.addEventListener("click", function () {
              const clickedRow = this.closest("tr");
              const restaurantName =
                clickedRow.querySelector("td:first-child").textContent;

              //ダイアログのIDを指定
              dialog.dataset.restaurantId = object[restaurantName];
              dialog.dataset.clickedRow = clickedRow;
              dialog.showModal();
            });
            const actionCell = document.createElement("td");
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);
            tableBody.appendChild(row);
          });
        });

      dialog.close();
    },
    false
  );

  btn_patch.addEventListener("click", () => {
    const restaurantId = dialog.dataset.restaurantId;
    fetch(
      "http://localhost:3003/api/restaurants/" +
        restaurantId +
        "/reviews/users/03343",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taste_level: parseInt(document.getElementById("taste_text").value),
          speed_level: parseInt(document.getElementById("speed_text").value),
          crowd_level: parseInt(document.getElementById("crowd_text").value),
        }),
      }
    ).then((res) => {
      return res.json();
    });
  });

  btn_post.addEventListener("click", () => {
    const restaurantId = dialog.dataset.restaurantId;
    fetch(
      "http://localhost:3003/api/restaurants/" +
        restaurantId +
        "/reviews/users/03343",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taste_level: parseInt(document.getElementById("taste_text").value),
          speed_level: parseInt(document.getElementById("speed_text").value),
          crowd_level: parseInt(document.getElementById("crowd_text").value),
        }),
      }
    ).then((res) => {
      return res.json();
    });
  });

  btn_delete.addEventListener("click", () => {
    const restaurantId = dialog.dataset.restaurantId;
    fetch(
      "http://localhost:3003/api/restaurants/" +
        restaurantId +
        "/reviews/users/03343",
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    ).then((res) => {
      return res.json();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {});
