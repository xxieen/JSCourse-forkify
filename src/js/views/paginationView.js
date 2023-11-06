import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateButtomMarkup(move) {
    const curPage = this.data.page;
    let step = -1;
    if (move === 'next') step = 1;
    return `
      <button data-goto = "${
        curPage + step
      }"class="btn--inline pagination__btn--${move}">
        <span>${curPage + step}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
  _generateMarkup() {
    const curPage = this.data.page;
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateButtomMarkup('next');
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateButtomMarkup('prev');
    }

    if (curPage < numPages) {
      return `
      ${this._generateButtomMarkup('prev')}
      ${this._generateButtomMarkup('next')}
      `;
    }
    return '';
  }
}

export default new PaginationView();
