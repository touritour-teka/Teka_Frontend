import './App.css';
import { Text, Column, Row, Input, DatePickerInput } from '@teka/ui';

function App() {
  return (
    <div className="App">
      <div>어드민</div>
      <Text fontType="regular12">dkssud</Text>
      <Column justifyContent="center" alignItems="center">
        <Row>안농</Row>
        <Row>안농</Row>
        <Input label="비밀번호" placeholder="비밀번호르 링별" isError={false} type='password'></Input>
        <DatePickerInput placeholder="비밀번호르 링별"></DatePickerInput>
      </Column>
    </div>
  );
}

export default App;
