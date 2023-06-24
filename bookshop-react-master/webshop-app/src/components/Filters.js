import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Offcanvas, Button } from "react-bootstrap";
import "../css/Filters.css";

function Filters({ filters, setFilters, handleChange, handleReset }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sort: e.target.value,
    });
  };

  const filterResults = (results) => {
    // Apply search filter
    if (filters.search) {
      results = results.filter((result) =>
        result.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    return results;
  };

  return (
    <div>
      <div className="menu pt-5 container">
        <div className="filter-buttons row ml-3 d-flex">
          <div className="d-flex justify-content-center">
            <div className="d-flex mt-3 ps-2">
              <span className="input-group-text" id="basic-addon1">
                <ImSearch />
              </span>
              <input
                className="form-control me-2 border-none"
                id="search-input"
                name="search"
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="d-flex mt-3 ps-2">
              <label className="input-group-text" htmlFor="sort">
                <i className="fas fa-sort"></i>Sort by
              </label>
              <select
                name="sort"
                id="sort"
                className="form-select border-none"
                value={filters.sort}
                onChange={handleSortChange}
              >
                <option value="none">Recommended</option>
                <option value="asc">Ascending price</option>
                <option value="desc">Descending price</option>
              </select>
            </div>
            <div className="mt-3 text-center ps-2">
              <Button variant="primary" onClick={handleShow} className="me-2">
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>Filters</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form action="/books" id="filter-form" method="get">
            <fieldset id="filter-category" className="filter-category">
              <h4>Category:</h4>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Children's Books"
                  name="category"
                  value="Children's Books"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Children's Books") !== -1
                      ? true
                      : false
                  }
                />
                <label>Children's Books</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Psychology"
                  name="category"
                  value="Psychology"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Psychology") !== -1 ? true : false
                  }
                />
                <label>Psychology</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Science Fiction"
                  name="category"
                  value="Science Fiction"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Science Fiction") !== -1
                      ? true
                      : false
                  }
                />
                <label>Science Fiction</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Fantasy"
                  name="category"
                  value="Fantasy"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Fantasy") !== -1 ? true : false
                  }
                />
                <label>Fantasy</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Fiction"
                  name="category"
                  value="Fiction"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Fiction") !== -1 ? true : false
                  }
                />
                <label>Fiction</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Business and Economics"
                  name="category"
                  value="Business and Economics"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Business and Economics") !== -1
                      ? true
                      : false
                  }
                />
                <label>Business and Economics</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Philosophy"
                  name="category"
                  value="Philosophy"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Philosophy") !== -1 ? true : false
                  }
                />
                <label>Philosophy</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Culture"
                  name="category"
                  value="Culture"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Culture") !== -1 ? true : false
                  }
                />
                <label>Culture</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Personal Development"
                  name="category"
                  value="Personal Development"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Personal Development") !== -1
                      ? true
                      : false
                  }
                />
                <label>Personal Development</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Culinary"
                  name="category"
                  value="Culinary"
                  onChange={handleChange}
                  defaultChecked={
                    filters.category.indexOf("Culinary") !== -1 ? true : false
                  }
                />
                <label>Culinary</label>
              </div>
            </fieldset>
            <fieldset id="filter-price" className="mt-2 filter-price">
              <h4>Price:</h4>
              <div className="filter-item">
                <input
                  type="radio"
                  name="price_range"
                  id="range_0_200"
                  value="0_200"
                  onChange={handleChange}
                  defaultChecked={
                    filters.price_range === "0_200" ? true : false
                  }
                />
                <label> 0-200 RUPEE</label>
              </div>
              <div className="filter-item">
                <input
                  type="radio"
                  name="price_range"
                  id="range_200_500"
                  value="200_500"
                  onChange={handleChange}
                  defaultChecked={
                    filters.price_range === "200_500" ? true : false
                  }
                />
                <label> 200-500 RUPEE</label>
              </div>
              <div className="filter-item">
                <input
                  type="radio"
                  name="price_range"
                  id="range_500_"
                  value="500"
                  onChange={handleChange}
                  defaultChecked={filters.price_range === "500" ? true : false}
                />
                <label> Above 500 RUPEE</label>
              </div>
            </fieldset>
            <fieldset id="filter-rating" className="mt-2">
              <h4>Minimum rating:</h4>
              <div className="filter-item">
                <input
                  type="number"
                  value={filters.minimum_rating}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minimum_rating: e.target.value,
                    })
                  }
                  name="minimum_rating"
                  id="minimum_rating"
                  min="0"
                  max="5"
                />
              </div>
            </fieldset>
            <fieldset id="filter-os" className="mt-2 filter-os">
              <h4>Publishing house:</h4>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Penguin"
                  name="publishing_house"
                  value="Penguin"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Penguin") !== -1
                      ? true
                      : false
                  }
                />
                <label>Penguin</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Vintage"
                  name="publishing_house"
                  value="Vintage"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Vintage") !== -1
                      ? true
                      : false
                  }
                />
                <label>Vintage</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Bloomsbury"
                  name="publishing_house"
                  value="Bloomsbury"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Bloomsbury") !== -1
                      ? true
                      : false
                  }
                />
                <label>Bloomsbury</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Orion"
                  name="publishing_house"
                  value="Orion"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Orion") !== -1
                      ? true
                      : false
                  }
                />
                <label>Orion</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Cornerstone"
                  name="publishing_house"
                  value="Cornerstone"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Cornerstone") !== -1
                      ? true
                      : false
                  }
                />
                <label>Cornerstone</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="Dorling"
                  name="publishing_house"
                  value="Dorling"
                  onChange={handleChange}
                  defaultChecked={
                    filters.publishing_house.indexOf("Dorling") !== -1
                      ? true
                      : false
                  }
                />
                <label>Dorling</label>
              </div>
            </fieldset>
            <fieldset id="filter-stock" className="mt-2">
              <h4>In stock:</h4>
              <input
                className="filter-item"
                type="checkbox"
                name="stock_yes"
                id="stock_yes"
                value="true"
                onChange={handleChange}
                defaultChecked={filters.stock_yes}
              />
              <label>Yes</label>
            </fieldset>
            <div className="filter-form-buttons d-flex justify-content-between">
              <input
                type="reset"
                id="reset"
                className="mt-3 reset-input"
                value="Reset filters"
                onClick={handleReset}
              />
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Filters;
