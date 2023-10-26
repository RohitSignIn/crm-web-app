export default function FilterComponent({ filterText, onFilter, onClear }) {
  return (
    <>
      <input
        id='search'
        type='text'
        className='input input-bordered w-full max-w-xs'
        placeholder='Search from all columns'
        aria-label='Search Input'
        value={filterText}
        onChange={onFilter}
      />
      <button className='btn bg-primary border-none ml-4' onClick={onClear}>
        clear
      </button>
    </>
  );
}
