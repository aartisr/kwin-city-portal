import React from 'react';

export default function dynamic(loader: () => Promise<any>, options?: any) {
  return function DynamicComponent(props: any) {
    const [Comp, setComp] = React.useState<any>(null);
    React.useEffect(() => {
      loader().then((mod) => setComp(() => mod.default || mod));
    }, []);
    if (!Comp) return options?.loading ? options.loading() : null;
    return <Comp {...props} />;
  };
}
