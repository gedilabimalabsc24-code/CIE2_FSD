// ──────────────────────────────────────────────────────────────
// SearchFilter – Functional Component
// Props: filters (object), onFilterChange (callback)
// Demonstrates: props, controlled inputs, onChange event handling,
//               parent–child communication via callback props
// ──────────────────────────────────────────────────────────────
function SearchFilter({ filters, onFilterChange }) {

  // Handle any input/select change and send updated value to parent
  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange(name, value)   // Calls parent's setState
  }

  // Reset all filters
  const handleReset = () => {
    onFilterChange('search', '')
    onFilterChange('maxBudget', '')
    onFilterChange('smoking', '')
    onFilterChange('pets', '')
  }

  return (
    <div className="search-filter">
      <h3>🔍 Search &amp; Filter Roommates</h3>

      <div className="filter-row">

        {/* Search by name or location */}
        <div className="filter-group">
          <label htmlFor="search">Name / Location</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="e.g. Ananya, Bangalore..."
          />
        </div>

        {/* Maximum budget filter */}
        <div className="filter-group">
          <label htmlFor="maxBudget">Max Budget (₹/mo)</label>
          <input
            type="number"
            id="maxBudget"
            name="maxBudget"
            value={filters.maxBudget}
            onChange={handleChange}
            placeholder="e.g. 9000"
            min="0"
          />
        </div>

        {/* Smoking preference filter */}
        <div className="filter-group">
          <label htmlFor="smoking">Smoking</label>
          <select
            id="smoking"
            name="smoking"
            value={filters.smoking}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="No">Non-Smoker</option>
            <option value="Yes">Smoker OK</option>
          </select>
        </div>

        {/* Pet preference filter */}
        <div className="filter-group">
          <label htmlFor="pets">Pets</label>
          <select
            id="pets"
            name="pets"
            value={filters.pets}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="No">No Pets</option>
            <option value="Yes">Pets OK</option>
          </select>
        </div>

      </div>

      {/* Reset button */}
      <div style={{ marginTop: '16px' }}>
        <button className="btn btn-outline btn-sm" onClick={handleReset}>
          ✕ Clear Filters
        </button>
      </div>
    </div>
  )
}

export default SearchFilter
