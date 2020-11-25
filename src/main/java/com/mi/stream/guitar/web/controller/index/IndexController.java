package com.mi.stream.guitar.web.controller.index;

import com.mi.stream.guitar.web.controller.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * index controller
 *
 * @author mi zxq
 * @date 2019/10/28 9:56
 */
@Controller
public class IndexController extends BaseController<String> {
    
    
    @GetMapping(value = {"/", "index"})
    public String index(Model model) {
        model.addAttribute("test", "testing");
        return "index/index";
    }
    
}
