const { readCoachNames, readUnlikeMenu } = require('../ui/InputView');
const { printStartMenuRecommadationMessage, printMenuRecommendationResult } = require('../ui/OutputView');

class MenuProcessor {
  #menu;
  #coachs = [];
  #coachIndex = 0;
  #unlikeMenu = {};

  constructor(menu) {
    this.#menu = menu;
  }

  start() {
    this.#startProcess();
  }

  #startProcess() {
    printStartMenuRecommadationMessage();
    this.#setCoachNamesProcess();
  }

  // 코치 이름 받기
  #setCoachNames(input) {
    this.#coachs = input.split(',').map((name) => name.trim());
    this.#setUnlikeMenuProcess(this.#coachIndex);
  }

  #setCoachNamesProcess() {
    readCoachNames(this.#setCoachNames.bind(this));
  }

  // 못 먹는 메뉴 입력받기
  #setUnlikeMenu(input) {
    this.#unlikeMenu[this.#coachs[this.#coachIndex]] = input.split(',').map((name) => name.trim());
    this.#coachIndex += 1;
    if (this.#coachIndex === this.#coachs.length) {
      return this.#showMenuRecommendationResultProcess();
    }
    this.#setUnlikeMenuProcess(this.#coachIndex);
  }

  #setUnlikeMenuProcess(coachIndex) {
    readUnlikeMenu(this.#coachs[coachIndex], this.#setUnlikeMenu.bind(this));
  }

  // 메뉴 추천 결과 출력하기
  #showMenuRecommendationResultProcess() {
    console.log(this.#unlikeMenu);
    console.log(this.#menu.recommendMenus(this.#unlikeMenu['포비']));
    printMenuRecommendationResult();

    // #menu.recommendFood()
  }
}

module.exports = MenuProcessor;
