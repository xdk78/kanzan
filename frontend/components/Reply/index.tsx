import React from 'react'
import { Wrapper, Actions, Input, Submit } from './styles'
import { Divider, Spinner, LoaderWrapper } from '../shared'
import { sanitizeMarkdown } from '../../utils/markdown'

type ReplyProps = {
  sendPost: (title: string, content: string) => void
  pending: boolean
  error: any
}

type ReplyState = {
  title: string
  content: string
}

export default class Reply extends React.PureComponent<ReplyProps, ReplyState> {
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
    e.preventDefault()
    const { title, content } = this.state
    if (title.trim() && content.trim()) {
      const santizedContent = sanitizeMarkdown(content)
      this.props.sendPost(title, santizedContent)
      this.setState({ title: '', content: '' })
    }
  }

  render() {
    const { pending, error } = this.props
    return (
      <Wrapper>
        {
          <Input
            onChange={this.onTitleChange}
            html={this.state.title}
            // @ts-ignore
            contentEditable="plaintext-only"
            placeholder="Title"
          />
        }
        <Divider />
        {
          <Input
            onChange={this.onContentChange}
            html={this.state.content}
            // @ts-ignore
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
