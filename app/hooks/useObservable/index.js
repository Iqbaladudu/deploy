import { useEffect, useState } from "react";
import { of } from "rxjs";
import { catchError } from "rxjs/operators"; // Import catchError operator

export default function useObservable(observable) {
  const [value, setValue] = useState(observable.value);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = observable
      .pipe(
        catchError((error) => {
          setError(error);
          return of(null); // Or any default value you want to use
        })
      )
      .subscribe(setValue);

    return () => subscription.unsubscribe();
  }, [observable]);

  return [value, error]; // Now return both the value and potential error
}
