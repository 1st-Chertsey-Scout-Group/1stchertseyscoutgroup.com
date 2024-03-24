import { Component } from "react";
import { Container } from "./container";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AnnouncementProps = {
  announcement: string;
  linkText?: string;
  linkHref?: string;
};

type AnnouncementState = {
  closed: boolean;
};

class Announcement extends Component<AnnouncementProps, AnnouncementState> {
  constructor(props: AnnouncementProps) {
    super(props);

    this.state = {
      closed: false,
    };

    this.handleAnnoucementClosed = this.handleAnnoucementClosed.bind(this);
  }

  handleAnnoucementClosed() {
    this.setState({ closed: true });
  }

  render() {
    return (
      <>
        <div
          className={cn(
            { "-top-10": this.state.closed },
            { "top-0": !this.state.closed },
            "fixed transition-all delay-150 bg-secondary text-secondary-foreground p-1 left-0 right-0"
          )}
        >
          <Container>
            <div className="flex">
              <div className="flex flex-1 gap-2 items-center justify-center">
                <span className="inline-block">{this.props.announcement}</span>
                {this.props.linkHref != "" && this.props.linkText ? (
                  <a
                    className="text-secondary-foreground inline-block"
                    href={this.props.linkHref}
                  >
                    {this.props.linkText}
                    <ArrowRight size={15} className="inline-block" />
                  </a>
                ) : (
                  <></>
                )}
              </div>
              <button
                className="flex justify-end"
                onClick={this.handleAnnoucementClosed}
              >
                <X />
              </button>
            </div>
          </Container>
        </div>
        <div className={cn("h-8 transition-all delay-150", { "h-0": this.state.closed })}></div>
      </>
    );
  }
}

export { Announcement };
