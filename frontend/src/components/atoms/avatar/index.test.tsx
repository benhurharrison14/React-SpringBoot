import React from 'react';
import { render , screen} from '@testing-library/react';
import {profile} from "../../../../public/images/profile.svg"
import Avatar from '.';

describe('Avatar Component', () => {
  it('renders an image with the provided alt text and src', () => {
    render(<Avatar alt="profile icon" src={profile}/>);
    expect(screen.getByTestId("avatar")).toHaveClass("MuiAvatar-root")
  });

  it('applies custom styles when sx prop is provided', () => {
    const sx = { backgroundColor: 'red' };
    const { container } = render(<Avatar alt="Test Alt" src="test.jpg" sx={sx} />);
    expect(container.firstChild).toHaveStyle('background-color: red');
  });
});
