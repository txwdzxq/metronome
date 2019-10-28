package com.mi.stream.guitar.web.controller.index;

import com.mi.stream.guitar.web.controller.base.BaseController;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author mi zxq
 * @date 2019/10/28 9:56
 */
@Controller
public class IndexController extends BaseController {
    public IndexController(HttpServletRequest request, HttpServletRequest response) {
        super(request, response);
    }
    
    @GetMapping(value = "hello")
    @ResponseBody
    public String hello() {
        return "hello";
    }
    
    
    @GetMapping(value = "/")
    public String index() {
        return "index/index";
    }
}
