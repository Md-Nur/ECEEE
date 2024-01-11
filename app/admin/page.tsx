import React from "react";

const Admin = () => {
  return (
    <main className="mx-auto max-w-[95vw] lg:max-w-[80vw] my-12">
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Click me to show/hide content
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </main>
  );
};

export default Admin;
