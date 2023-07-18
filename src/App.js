import data from "./data.json";
import { useEffect, useState } from "react";

function App() {
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredList(data);
      return;
    }

    const filtered = data.filter((item) =>
      filters.every(
        (filter) =>
          item.level === filter ||
          item.role === filter ||
          item.languages.includes(filter) ||
          item.tools.includes(filter)
      )
    );

    setFilteredList(filtered);
  }, [filters]);

  function handleAddFilter(item) {
    if (filters.includes(item)) return;
    setFilters((currFilters) => [...currFilters, item]);
  }

  function handleRemoveFilter(tag) {
    const index = filters.indexOf(tag);
    const temp = filters.slice();
    if (index > -1) {
      temp.splice(index, 1);
      setFilters(temp);
    }
  }

  function handleRemoveAllFilters() {
    setFilters([]);
  }

  return (
    <div className="app">
      <header></header>
      {filters.length > 0 && (
        <div className="tags-container">
          {filters.map((filter, index) => (
            <Tag
              filter={filter}
              onRemoveFilter={handleRemoveFilter}
              key={index}
            />
          ))}
          <p className="clear" onClick={handleRemoveAllFilters}>
            Clear
          </p>
        </div>
      )}
      {filteredList.map((job) => (
        <JobItem
          jobInfo={job}
          onHandleAddFilter={handleAddFilter}
          key={job.id}
        />
      ))}
    </div>
  );
}

function Tag({ filter, onRemoveFilter }) {
  return (
    <div className="tag">
      <span>{filter}</span>
      <button onClick={() => onRemoveFilter(filter)}>&times;</button>
      <p></p>
    </div>
  );
}

function JobItem({ jobInfo, onHandleAddFilter }) {
  return (
    <div className={`job-card ${jobInfo.featured && "featured-border"}`}>
      <div className="job-image">
        <img src={jobInfo.logo} alt={`${jobInfo.company} logo`} />
      </div>
      <div className="job-info">
        <div className="job-title">
          {jobInfo.company}
          {jobInfo.new && <span className="new">new!</span>}
          {jobInfo.featured && <span className="featured">featured</span>}
        </div>

        <div className="job-position">{jobInfo.position}</div>
        <div className="job-additional-info">
          <p>{jobInfo.postedAt}</p> &#183;
          <p>{jobInfo.contract}</p> &#183;
          <p>{jobInfo.location}</p>
        </div>
      </div>
      <div className="job-tags">
        {[
          jobInfo.role,
          jobInfo.level,
          ...jobInfo.languages,
          ...jobInfo.tools,
        ].map((item) => (
          <div
            className="job-tag"
            key={item}
            onClick={() => onHandleAddFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
