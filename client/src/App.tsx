import { useEffect, useState } from 'react';

export function App() {
  const [text, setText] = useState<string | null>(null);

  fetch('/api/hello-world')
    .then((res) => res.json())
    .then((res) => setText(res));

  if (text) {
    return <div>{text}</div>;
  } else {
    <div>Full-Stack Challenge</div>;
  }
}
