const ContentLayout = ({ title, children }) => {
  return (
    <div>
      <h1 className="text-3xl mb-6">{title}</h1>
      <main>{children}</main>
    </div>
  );
};

export default ContentLayout;
