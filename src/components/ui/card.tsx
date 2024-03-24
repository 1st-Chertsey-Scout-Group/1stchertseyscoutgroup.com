import { Component } from "react";

type CardProps = {
  children: React.ReactElement<CardHeader | CardFooter>[];
};

type CardState = {};

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p-2">
        <div className="flex flex-col bg-card text-card-foreground h-full">
          {this.props.children}
        </div>
      </div>
    );
  }
}

type CardImageProps = {
  href?: string;
  children: React.ReactNode;
};

type CardImageState = {};

class CardImage extends Component<CardImageProps, CardImageState> {
  constructor(props: CardImageProps) {
    super(props);

    this.state = {};
  }

  render() {
    return this.props.href ? (
      <a href={this.props.href}>{this.props.children}</a>
    ) : (
      this.props.children
    );
  }
}

type CardHeaderProps = {
  href?: string;
  children: React.ReactNode;
};

type CardHeaderState = {};

class CardHeader extends Component<CardHeaderProps, CardHeaderState> {
  constructor(props: CardHeaderProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="pt-4 px-8 text-xl pb-1 font-black">
        {this.props.href ? (
          <a className="block text-card-foreground" href={this.props.href}>
            {this.props.children}
          </a>
        ) : (
          <>{this.props.children}</>
        )}
      </div>
    );
  }
}

type CardContentProps = {
  children: React.ReactNode;
};

type CardContentState = {};

class CardContent extends Component<CardContentProps, CardContentState> {
  constructor(props: CardContentProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className="px-8 pb-4">{this.props.children}</div>;
  }
}

type CardFooterProps = {
  href: string;
  children: React.ReactNode;
};

type CardFooterState = {};

class CardFooter extends Component<CardFooterProps, CardFooterState> {
  constructor(props: CardFooterProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <a className="pb-6 px-8 font-bold mt-auto" href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

export { Card, CardHeader, CardFooter, CardImage, CardContent };
