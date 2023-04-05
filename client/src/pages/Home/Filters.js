import React from "react";

const categories = [
  {
    name: "Books",
    value: "Books",
  },
  {
    name: "Electronics",
    value: "Electronics",
  },
  {
    name: "Fashion",
    value: "Fashion",
  },
  {
    name: "Home",
    value: "Home",
  },
  {
    name: "Sports",
    value: "Sports",
  },
  {
    name: "Toys",
    value: "Toys",
  },
];

const conditions = [
  {
    name: "New",
    value: "New",
  },
  {
    name: "Like new",
    value: "Like new",
  },
  {
    name: "Good",
    value: "Good",
  },
  {
    name: "Fair",
    value: "Fair",
  },
  {
    name: "Worn",
    value: "Worn",
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-64 pl-6 pt-3 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-xl  text-gray-800 font-semibold">Filters</h1>
        <i
          class="ri-close-line text-xl cursor-pointer"
          cursor-pointer
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-800">Categories</h1>
        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category" className="text-gray-600">
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>

        <h1 className="text-gray-800 pt-3">Conditions</h1>
        <div className="flex flex-col">
          {conditions.map((condition) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="condition"
                  className="max-width"
                  checked={filters.condition.includes(condition.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        condition: [...filters.condition, condition.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        condition: filters.condition.filter(
                          (item) => item !== condition.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="condition" className="text-gray-600">
                  {condition.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
