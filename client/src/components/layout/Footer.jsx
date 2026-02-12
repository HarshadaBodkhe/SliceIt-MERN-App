function Footer() {
  return (
    <footer className=" bg-primary py-6">
      <div className="flex flex-row justify-center items-center container mx-auto text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} SliceIt. Serving code & pizza vibes 🍕.
          Created with ♥ by{' '}
          <a
            href="https://bento.me/itxsaaad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-secondary underline underline-offset-4"
          >
            Harshada Bodkhe
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
