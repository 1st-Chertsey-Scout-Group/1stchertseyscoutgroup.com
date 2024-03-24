import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { Component } from "react";

type ShareButtonProps = {
    className?: string;
};

type ShareButtonState = {};

class ShareButton extends Component<ShareButtonProps, ShareButtonState> {
  constructor(props: ShareButtonProps) {
    super(props);

    this.state = {};

    this.handleShareClick = this.handleShareClick.bind(this);
  }

  handleShareClick() {}

  render() {
    return (
      <button aria-label="Share this page" className={cn(this.props.className)} onClick={this.handleShareClick}>
        <Share2 aria-hidden="true" />
      </button>
    );
  }
}

export { ShareButton };
