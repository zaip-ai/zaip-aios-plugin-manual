import { landing } from '../data/landing';

export default function DetailsList() {
  return (
    <div className="case-list">
      {landing.highlights.map(item => (
        <details className="case" name="detalhes" id={item.id} key={item.id}>
          <summary>
            <span><small>{item.label}</small><strong>{item.value} · {item.detail}</strong></span>
            <span className="toggle-icon" aria-hidden="true" />
          </summary>
          <div className="case-body"><p>{landing.details.body}</p></div>
        </details>
      ))}
    </div>
  );
}
