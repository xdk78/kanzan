import * as React from 'react'
import { Wrapper, Actions, Input, Submit } from './styles'
import { Divider, Spinner, LoaderWrapper } from '../shared'

interface IReplyProps {
  readonly sendPost: (title: string, content: string) => void
  readonly pending: boolean
  readonly error: any
}

interface IReplyState {
  readonly title: string
  readonly content: string
}

export default class Reply extends React.PureComponent<IReplyProps, IReplyState> {
  state = {
    title: '',
    content: ''
  }

  onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ title: e.target.value })
  }

  onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: e.target.value })
  }

  onSubmit = (e: React.SyntheticEvent) => {
    const { title, content } = this.state
    if (title.trim() && content.trim()) {
      this.props.sendPost(title, content)
      this.setState({ title: '', content: '' })
    }
  }

  render() {
    const { pending, error } = this.props
    return (
      <Wrapper>
        {
          // @ts-ignore
          <Input
            onChange={this.onTitleChange}
            html={this.state.title}
            contentEditable="plaintext-only"
            placeholder="Title"
          />
        }
        <Divider />
        {
          // @ts-ignore
          <Input
            onChange={this.onContentChange}
            html={this.state.content}
            contentEditable="plaintext-only"
            placeholder="Your thoughts..."
          />
        }
        <Actions>
          <Submit onClick={this.onSubmit}>Send</Submit>
        </Actions>
        {pending && !error ? (
          <LoaderWrapper>
            <Spinner />
          </LoaderWrapper>
        ) : (
          <div>{error}</div>
        )}
      </Wrapper>
    )
  }
}
