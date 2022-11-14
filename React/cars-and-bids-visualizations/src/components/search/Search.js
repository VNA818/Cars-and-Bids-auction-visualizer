import './Search.css'
import { useState, useEffect } from 'react';
import Car from '../car/Car';

const Search = (data) => {
  const [value, setValue] = useState('');
  const [dataCopy, setDataCopy] = useState([]);
  const [sort, setSort] = useState('none');
  const [show, setShow] = useState('all');
  const [customList, setCustomList] = useState('none');
  const [page, setPage] = useState(0);

  const submit = (event) => {
    event.preventDefault();
    search(value);
  }

  const resetClick = () => {
    setValue('');
    setSort('none');
    data.reset();
    setShow('all');
    setDataCopy(data.data);
    setPage(0);
  }



  const search = (query) => {
    if(data.data.length == 0) {
      resetClick();
    }
    var result = [];
    if(query.trim() == '') { 
      data.setSearchQuery("All results");
      data.reset();
      return 0;
    }
    data.data.forEach((x) => {
        var search = query.trim().toLowerCase().split(' '); 
        var i = 0;
        search.forEach((y) => {
            if(x.Model.toLowerCase().search(y) != -1) {
                i++;
            }
        });
        if(i == search.length) {
            result.push(x);
        }
    });
    setDataCopy(result);
    setValue("");
    
    if(result.length > 0) {
      data.setSearchQuery(query);
      data.setData(result);
    }
    
  }

  const sortChange = (value) => {
    console.log(value);
    setSort(value);
    let d = [...dataCopy];
    var direction = parseInt(value.charAt(value.length - 1));
    value = value.substring(0, value.length - 1);
    console.log(direction);
    switch(value) {
      case 'date':
        d.sort((a, b) => {
          a = new Date(a['Date-Ended'] + ' 01:00:00').getTime();  
          b = new Date(b['Date-Ended'] + ' 01:00:00').getTime();
          return direction ? a - b : b - a;
        });
        setDataCopy(...[d]);
        break;
      case 'year':
        d.sort((a, b) => {
          a = parseInt(a.Model);
          b = parseInt(b.Model);
          return direction ? a - b : b - a;
        });
        setDataCopy(...[d]);
        break;
      case 'price':
        d.sort((a, b) => {
          return direction ? a.ResultMin[1] - b.ResultMin[1] : b.ResultMin[1] - a.ResultMin[1];
        });
        setDataCopy(...[d]);
        break;
      default:
      break
    }
  }

  const showChange = (value) => {
    setShow(value);
    if(value != 'all') {
      let d = [...dataCopy];
      d = d.filter((x) => {
        return x.ResultMin[0] == value;
      });
      setDataCopy(...[d]);
    }
  }

  const customAdd = (list) => {
    console.log(list);
    setCustomList(...[list, customList]);
  }

  useEffect(() => {
    setDataCopy(...[data.data]);
  }, [data.data]);

  return ( 
    <>
      <div className="search">
        <form onSubmit={submit}>
          <span id="bar">
            <input 
              id="search-box"
              type="text"
              value={value}
              placeholder={"Searching: " + data.searchQuery}
              onChange={(event) => setValue(event.target.value)}
            />
            <input id="reset" type="button" value="Reset" onClick={() => {resetClick()}}/>
            <input className="button" id="submit" value="Go" type="submit"/>
          </span>
          {/*<input className="button" type="button" value="Add all" onClick={() => {customAdd(dataCopy)}}/> */}
          <span id="filter">
            <label>{dataCopy.length} Results</label>
            <select name="sort" id="sort" value={sort} onChange={(event) => {sortChange(event.target.value)}}>
              <option value="none">None</option>
              <option value="date0">Date ↑</option>
              <option value="date1">Date ↓</option>
              <option value="price0">Price ↑</option>
              <option value="price1">Price ↓</option>
              <option value="year0">Year ↑</option>
              <option value="year1">Year ↓</option>
            </select>
            <select name="show" id="show" value={show} onChange={(event) => {showChange(event.target.value)}}>
              <option value="all">All</option>
              <option value="Sold">Sold</option>
              <option value="Bid">Bid to</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </span>
          <span id="pages">
            <input className="button" type="button" value="< Prev" onClick={() => {
              if(page > 0) {
                setPage(page - 100);
              }
            }}/>
            <label>{page / 100 + 1} / {dataCopy && Math.ceil(dataCopy.length / 100)}</label>
            <input className="button" type="button" value="Next >" onClick={() => {
              if(dataCopy.length > page + 100) {
                setPage(page + 100);
              }
            }}/>
          </span>
        </form>
      </div>
      <div className="models">
        {dataCopy && dataCopy.slice(page, page + 100).map((x, i) => {
          if(data.selected != null && x.Description == data.selected.Description) {
            return <Car key={i} car={x} selected={true}/>
          } else {
            return <Car key={i} car={x} selected={false}/>
          }
        })}
      </div>
    </>
  ); 
}
 
export default Search;