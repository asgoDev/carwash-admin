const ContentLayout = ({ title, children }) => {
  return (
    <div className="absolute min-w-[100%] p-6 md:px-12 ">
      <h1 className="text-3xl mb-6">{title}</h1>
      <main>{children}</main>
    </div>
  );
};

export default ContentLayout;
