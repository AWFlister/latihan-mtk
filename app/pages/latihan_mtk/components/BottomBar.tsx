import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";

export function BottomBar() {
  return (
    <footer className="bg-light text-center py-3 mt-4">
      <Container>
        <span>
          Buatan
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 10 }}
            overlay={<Tooltip id="dek-kindut">Buat dek Kindut</Tooltip>}
          >
            <span className="fw-bold"> AWFlister</span>
          </OverlayTrigger> (dibantuin ChatGPT) | &nbsp;
        </span>
        <a href="https://github.com/AWFlister/latihan-mtk" target="_blank" rel="noopener noreferrer">
          Reponya
        </a>
      </Container>
    </footer>
  );
}
