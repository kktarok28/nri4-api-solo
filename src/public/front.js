window.addEventListener("load", () => {
  // YOUR SOLUTION GOES HERE.
});

window.addEventListener("DOMContentLoaded", () => {
  // コンポーネントの定義
  const tempObject = {};
  const baseURI = "http://localhost:3003";
  const dialog = document.querySelector("dialog"); // dialog（モーダルダイアログ）の宣言
  const btn_post = document.getElementById("post"); // open（開く）ボタンの宣言
  const btn_patch = document.getElementById("patch"); // close（閉じる）ボタンの宣言
  const btn_delete = document.getElementById("delete"); // close（閉じる）ボタンの宣言
  const btn_close = document.getElementById("close"); // close（閉じる）ボタンの宣言
  const tableBody = document.getElementById("tbody"); // tablebodyの宣言
  const viewList = [
    //表示する列名
    "restaurant_name",
    "taste_level",
    "speed_level",
    "crowd_level",
    "sum",
    "own_taste_level",
    "own_speed_level",
    "own_crowd_level",
  ];

  //イベントハンドラーで利用する関数を定義
  const apiSendMethod = async (url, body, method) => {
    const req = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    if (method !== "GET") {
      req.body = JSON.stringify(body);
    }
    return await fetch(url, req).then((res) => res.json());
  };

  const fetchDataAndPopulateTable = async () => {
    await apiSendMethod(
      baseURI + "/api/resutaurants/reviews/users/03343",
      null,
      "GET"
    ).then((res) => {
      res.reviewList.forEach((review) => {
        //dialogでのAPI呼び出しのために必要な引数を取得しておく。
        tempObject[review["restaurant_name"]] = review["restaurant_id"];

        const row = document.createElement("tr");
        const imageContainer = document.createElement("div");
        const image = document.createElement("img");
        image.src = "images/" + review["restaurant_id"] + ".png"; // 画像のパスを設定
        image.style.maxHeight = "75px";

        viewList.forEach((view) => {
          const cell = document.createElement("td");

          if (view === "restaurant_name") {
            // 画像要素を画像を含む要素に追加
            imageContainer.appendChild(image);

            // 画像を含む要素をセルに追加
            cell.textContent = review[view];
            cell.style.fontWeight = "bold";
            cell.style.color = "red";
            cell.appendChild(imageContainer);
          } else {
            cell.textContent = review[view];
          }
          row.appendChild(cell);
        });

        const actionButton = document.createElement("button");
        actionButton.textContent = "登録/更新/削除";
        actionButton.addEventListener("click", function () {
          const clickedRow = this.closest("tr");
          const restaurantName =
            clickedRow.querySelector("td:first-child").textContent;

          //ダイアログのIDを指定
          dialog.dataset.restaurantId = tempObject[restaurantName];
          dialog.showModal();
        });
        const actionCell = document.createElement("td");
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    });
  };

  const resetTableBody = () => {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  };

  const resetDialogText = () => {
    document.getElementById("taste_text").value = "";
    document.getElementById("speed_text").value = "";
    document.getElementById("crowd_text").value = "";
  };

  //イベントハンドラーの定義

  //初期処理
  fetchDataAndPopulateTable();

  btn_close.addEventListener(
    "click",
    () => {
      dialog.close();
    },
    false
  );

  btn_patch.addEventListener("click", async () => {
    const restaurantId = dialog.dataset.restaurantId;

    const reqBody = {
      taste_level: parseInt(document.getElementById("taste_text").value),
      speed_level: parseInt(document.getElementById("speed_text").value),
      crowd_level: parseInt(document.getElementById("crowd_text").value),
    };
    await apiSendMethod(
      baseURI + "/api/restaurants/" + restaurantId + "/reviews/users/03343",
      reqBody,
      "PATCH"
    );
    resetTableBody();
    await fetchDataAndPopulateTable();
    resetDialogText();
  });

  btn_post.addEventListener("click", async () => {
    const restaurantId = dialog.dataset.restaurantId;
    const reqBody = {
      taste_level: parseInt(document.getElementById("taste_text").value),
      speed_level: parseInt(document.getElementById("speed_text").value),
      crowd_level: parseInt(document.getElementById("crowd_text").value),
    };
    await apiSendMethod(
      baseURI + "/api/restaurants/" + restaurantId + "/reviews/users/03343",
      reqBody,
      "POST"
    );
    resetTableBody();
    await fetchDataAndPopulateTable();
    resetDialogText();
  });

  btn_delete.addEventListener("click", async () => {
    const restaurantId = dialog.dataset.restaurantId;
    await apiSendMethod(
      baseURI + "/api/restaurants/" + restaurantId + "/reviews/users/03343",
      {},
      "DELETE"
    );
    resetTableBody();
    await fetchDataAndPopulateTable();
    resetDialogText();
  });
});
