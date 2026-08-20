export function StarRating({ total }: { total: number }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    document.title = selected > 0 ? `Rated ${selected}/${total}` : 'Not rated';
  }, [selected, total]);

  const stars = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className="rating">
      {stars.map((value) => (
        <button key={value} onClick={() => setSelected(value)}>
          {value <= selected ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
