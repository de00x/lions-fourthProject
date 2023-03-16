import { IFindRepository } from "types/types";
import "./styles/index.scss";

const mainWrapper: HTMLDivElement | null =
  document.querySelector(".mainWrapper");
const searchRepositoryContainer: HTMLDivElement | null = document.querySelector(
  ".searchRepositoryContainer"
);
const searchInput: HTMLInputElement | null =
  document.querySelector(".searchInput");
const searchForm: HTMLFormElement | null =
  document.querySelector(".searchForm");
const searchImg: HTMLImageElement | null = document.querySelector(".searchImg");

function createRepository(items: IFindRepository[]) {
  const foundResultsContainer = document.querySelectorAll(
    ".foundResultsContainer"
  );
  if (foundResultsContainer.length !== 0) {
    foundResultsContainer.forEach((e) => e.remove());
  }
  const searchErrLength = document.querySelectorAll(".searchErrLength");
  searchErrLength.forEach((e) => e.remove());

  items.map((item) => {
    const foundResultsContainer = document.createElement("div");
    foundResultsContainer.className = "foundResultsContainer";
    const foundName = document.createElement("div");
    foundName.className = "foundName";
    foundName.innerHTML = `Name: ${item.name}`;
    const foundFullName = document.createElement("div");
    foundFullName.className = "foundFullName";
    foundFullName.innerHTML = `Full Name: ${item.full_name}`;
    const foundDescription = document.createElement("div");
    foundDescription.className = "foundDescription";
    foundDescription.innerHTML = `Description: ${item.description}`;
    const foundLogin = document.createElement("div");
    foundLogin.className = "foundLogin";
    foundLogin.innerHTML = `Login: ${item.owner.login}`;
    const foundId = document.createElement("div");
    foundId.className = "foundId";
    foundId.innerHTML = `id: ${item.owner.id}`;
    const foundAvatar = document.createElement("img");
    foundAvatar.className = "foundAvatar";
    foundAvatar.src = item.owner.avatar_url;
    foundAvatar.alt = "userAvatar";
    const foundLinkContainer = document.createElement("div");
    foundLinkContainer.className = "foundLinkContainer";
    const foundLink = document.createElement("a");
    foundLink.className = "foundLink";
    foundLink.innerHTML = "Link";
    foundLink.href = item.html_url;
    foundLink.target = "_blank";

    mainWrapper?.appendChild(foundResultsContainer);
    foundResultsContainer?.appendChild(foundName);
    foundResultsContainer?.appendChild(foundFullName);
    foundResultsContainer?.appendChild(foundDescription);
    foundResultsContainer?.appendChild(foundLogin);
    foundResultsContainer?.appendChild(foundId);
    foundResultsContainer?.appendChild(foundAvatar);
    foundResultsContainer?.appendChild(foundLinkContainer);
    foundLinkContainer?.appendChild(foundLink);
  });

  if (items.length === 0) {
    const searchNothingFoundClass = document.querySelectorAll(
      ".searchNothingFound"
    );
    if (searchNothingFoundClass.length === 0) {
      const searchNothingFound = document.createElement("div");
      searchNothingFound.className = "searchNothingFound";
      searchNothingFound.innerHTML = "Ничего не найдено";
      searchRepositoryContainer?.appendChild(searchNothingFound);
    }
  } else {
    const searchNothingFound = document.querySelectorAll(".searchNothingFound");
    searchNothingFound.forEach((e) => e.remove());
  }
}

async function searchRepository() {
  const searchErrLengthClass = document.querySelectorAll(".searchErrLength");

  if (searchInput !== null) {
    if (searchInput.value.length !== 0) {
      await fetch(
        `https://api.github.com/search/repositories?q=${searchInput.value}&per_page=10`
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((res) => createRepository(res.items));
          }
        })
        .catch((err) => console.error("err", err));
    } else if (searchErrLengthClass.length === 0) {
      const searchErrLength = document.createElement("div");
      searchErrLength.className = "searchErrLength";
      searchErrLength.innerHTML = "Введите хотя бы 1 символ";
      searchRepositoryContainer?.appendChild(searchErrLength);
    }
  }
}

searchImg?.addEventListener("click", () => {
  searchRepository();
});
searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  searchRepository();
});
